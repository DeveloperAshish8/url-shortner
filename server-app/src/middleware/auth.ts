import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

interface JwtPayload {
  _id: string;
  // you can add other fields like email, role, etc.
}

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({
        statusCode: 401,
        message: "Please login to continue",
      });
      return;
    }

    // const decodedToken = jwt.verify(
    //   token,
    //   String(process.env.ACCESS_TOKEN_SECRET)
    // );
    const decodedToken = jwt.verify(
      token,
      String(process.env.ACCESS_TOKEN_SECRET)
    ) as JwtPayload;

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      res.status(401).json({
        statusCode: 401,
        message: "Invalid Access Token",
      });
      return;
    }

    (req as any).user = user;
    next();
  } catch (error) {
    throw new Error("Error in Verifying JWT");
  }
};
