import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import User from '../../../../../models/User';
import bcrypt from 'bcryptjs';

interface LoginData {
  email: string;
  password: string;
}

export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    const data: LoginData = await req.json();
    const { email, password } = data;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { message: 'No user found with the given email address' },
        { status: 404 }
      );
    }

    const passwordFromDatabase = existingUser.password;
    const passwordValid = await bcrypt.compare(password, passwordFromDatabase);

    if (passwordValid) {
      return NextResponse.json(
        { message: 'Successfully logged in' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Password is incorrect.' },
      { status: 400 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 }
    );
  }
};
