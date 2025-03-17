import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
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
    },
    subscribedForNotifications: {
      type: Boolean,
      default: false,
    },
    defaultChecklistData: Array,
  },
  { timestamps: true, strict: false }
);

const Users = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default Users;
