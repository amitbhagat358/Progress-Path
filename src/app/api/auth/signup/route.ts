import { connectToDatabase } from '@/lib/mongodb';
import User from '../../../../../models/User';
import { createToken } from '@/lib/serverUtils';

import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

interface SignupData {
  username: string;
  email: string;
  password: string;
}

export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    const data: SignupData = await req.json();
    const { username, email, password } = data;

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'Please fill all the inputs.' },
        { status: 400 }
      );
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: 'User with given email already exists. Log in with that.' },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = await createToken(newUser._id);

    const response = NextResponse.json(
      { message: 'Signup successful' },
      { status: 200 }
    );

    response.cookies.set('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 }
    );
  }
};
