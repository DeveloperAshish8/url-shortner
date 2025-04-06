import { log } from "console";
import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.CONNECTION_STRING}`);
    console.log("DB Connected: ", connect.connection.host);
  } catch (error) {
    console.log("Error in DB COnnection:", error);
  }
};

export default connectDb;
