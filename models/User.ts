import { connectToDatabase } from '@/lib/mongodb';
import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the IUser interface
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

// Create the User model with a function that checks if it already exists to prevent re-compiling in development
const createUserModel = async (): Promise<Model<IUser>> => {
  await connectToDatabase();
  console.log('models', mongoose.models);

  if (mongoose.models.User) {
    // Return existing model if it already exists
    return mongoose.models.User as Model<IUser>;
  }

  // Define the User schema
  const userSchema: Schema<IUser> = new Schema(
    {
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    { timestamps: true }
  );

  // Create and return the User model
  return mongoose.model<IUser>('User', userSchema);
};

// Ensure the model is resolved before exporting
let User: Model<IUser>;

const getUserModel = async (): Promise<Model<IUser>> => {
  if (!User) {
    User = await createUserModel(); // Resolve the promise before using the model
  }
  return User;
};

export default getUserModel;
