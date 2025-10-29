import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
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
      minlength: 6,
      // Not required for Google users
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true, // allows null values but keeps uniqueness when present
    },

    profilePic: {
      type: String, // optional: store user's Google profile picture
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
