// mongodb+srv://muhammedanshidht:WU1V3N5QhD0to0tM@cluster0.oozpamy.mongodb.net/schoolTask?retryWrites=true&w=majority 

import mongoose from "mongoose";
console.log("here is the db")
const connectDB = async () => {
 
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
};

export default connectDB;
