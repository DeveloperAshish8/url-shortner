import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  refreshToken: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    fullName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    refreshToken: {
      type: String,
    },
    shortUrls: [
      {
        type: Schema.Types.ObjectId, //reference to another table
        ref: "ShortUrl",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//middleware before save
userSchema.pre("save", async function (next) {
  // avoid arrow func as theri is no reference for this in Arrow func
  if (!this.isModified("password")) return next(); // if pass is not changes
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// userSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       email: this.email,

//       fullName: this.fullName,
//     },
//     process.env.ACCESS_TOKEN_SECRET!,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     }
//   );
// };

// userSchema.methods.generateRefreshToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//     },
//     process.env.REFRESH_TOKEN_SECRET!,
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//     }
//   );
// };

userSchema.methods.generateAccessToken = function (): string {
  const secret: jwt.Secret | undefined = process.env.ACCESS_TOKEN_SECRET;
  const expiry: number | undefined = process.env.ACCESS_TOKEN_EXPIRY
    ? parseInt(process.env.ACCESS_TOKEN_EXPIRY, 10)
    : undefined;

  if (!secret || !expiry) {
    throw new Error(
      "Missing ACCESS_TOKEN_SECRET or ACCESS_TOKEN_EXPIRY in environment variables"
    );
  }

  const payload = {
    _id: this._id,
    email: this.email,
    fullName: this.fullName,
  };

  const options: jwt.SignOptions = {
    expiresIn: expiry,
  };

  return jwt.sign(payload, secret, options);
};

userSchema.methods.generateRefreshToken = function (): string {
  const secret: jwt.Secret | undefined = process.env.REFRESH_TOKEN_SECRET;
  const expiry: number | undefined = process.env.REFRESH_TOKEN_EXPIRY
    ? parseInt(process.env.REFRESH_TOKEN_EXPIRY, 10)
    : undefined;

  if (!secret || !expiry) {
    throw new Error(
      "Missing REFRESH_TOKEN_SECRET or REFRESH_TOKEN_EXPIRY in environment variables"
    );
  }

  const payload = {
    _id: this._id,
  };

  const options: jwt.SignOptions = {
    expiresIn: expiry,
  };

  return jwt.sign(payload, secret, options);
};

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
