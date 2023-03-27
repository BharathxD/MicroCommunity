import mongoose from "mongoose";
import logger from "./logger";


export const connect = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      throw new Error("Provide a valid DB URI");
    }
    mongoose.set("strictQuery", false);
    logger.info("Connecting to the Database...");
    await mongoose.connect(MONGO_URI);
    logger.info("Successfully connected to the Database");
  } catch (error: any) {
    logger.error(`Something went wrong: ${error.message}`);
  }
};

export const disconnect = async () => {
  try {
    await mongoose.disconnect();
  } catch (error: any) {
    logger.error(`Error disconnecting from the Database: ${error.message}`);
  }
};
