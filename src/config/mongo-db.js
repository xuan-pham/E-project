import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(`Error:${error.message}`);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};
export default connectDB;
