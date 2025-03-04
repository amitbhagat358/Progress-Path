"use server";
import {
  SignupFormSchema,
  FormState,
  LoginFormState,
  LoginFormSchema,
} from "@/lib/definitions";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "@/lib/sessions";
import { redirect } from "next/navigation";
import Users from "@/schemas/UserSchema";

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, email, password } = validatedFields.data;
  await connectToDatabase();

  const user = await Users.findOne({ email });
  if (user) {
    return {
      message: "User already exists",
      description: "Please login if you're already a user",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new Users({
    username,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  const userId = newUser._id.toString();
  if (!userId) {
    return {
      message: "An error occurred while creating your account.",
      description: "Please try again",
    };
  }
  // await createSession(userId);

  return { userId: newUser._id.toString() };
}

export async function login(state: LoginFormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  await connectToDatabase();
  const user = await Users.findOne({ email });
  if (!user) {
    return {
      message: "User Not Found",
      description: "Please check the email or sign up if you haven't already",
    };
  }

  const hashedPassword = user.password;
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordCorrect) {
    return {
      message: "Invalid Password",
      description: "Please try again.",
    };
  }
  await createSession(user._id.toString());
  return { userId: user._id.toString() };
}

export async function logout() {
  await deleteSession();
  // redirect('/login');
}
