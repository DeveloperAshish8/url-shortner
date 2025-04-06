import { IUser, User } from "../models/user";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";

const generateAccessAndRefreshTokens = async (
  userId: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, fullName } = req.body;
  // console.log("email: ", email);

  if (
    [fullName, email, password].some((field) => field?.trim() === "") // if all are empty returns false
  ) {
    res.status(400).send({ message: "Missing data" });
    return;
    // throw new ApiError(400, "All Fields are Required");
  }

  const existedUser = await User.findOne({
    email,
  });

  if (existedUser) {
    res.status(409).send({ message: "User Already Exist" });
    return;
  }

  const user = await User.create({
    email,
    password,
    fullName,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    res.status(500).send({ message: "Something wrong with user creation" });
    return;
  }

  res.status(201).send(createdUser);
  return;
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ message: "Email or Password Missing" });
    return;
  }

  const user = (await User.findOne({
    email,
  })) as IUser;

  if (!user || !user._id) {
    res.status(404).send({ message: "User not found" });
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // const isPasswordValid = await user.isPasswordCorrect(password); // not User.isPass... because methods are present on instance not moongose

  if (!isPasswordValid) {
    res.status(404).send({ message: "Incorrect password" });
    return;
    // throw new ApiError(404, "Incorrect password");
  }

  const tokens = await generateAccessAndRefreshTokens(String(user._id));

  if (!tokens) {
    res.status(500).send({ message: "Token generation failed" });
    return;
  }

  const { accessToken, refreshToken } = tokens;

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  ); // updated user data with refresh Token

  const options = { httpOnly: true, secure: true };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      statusCode: 200,
      message: "User logged in successfully",
      data: {
        user: loggedInUser,
        accessToken,
        refreshToken,
      },
    });
  return;
};

const logoutUser = async (req: Request, res: Response): Promise<void> => {
  const user = (req as Request & { user: IUser }).user;
  await User.findByIdAndUpdate(
    user._id, // we have access to id as we have came from a middleware to logout function (check user route)
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = { httpOnly: true, secure: true };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      statusCode: 200,
      message: "User logged out successfully",
    });
  return;
};

export { registerUser, loginUser, logoutUser };
