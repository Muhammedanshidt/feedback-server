// import UserModel from "../model/User.model.js"



// export const userSignup = async (data) => {
//     try {
//       const { name, email } = data;
  
//       const existingUser = await UserModel.findOne({ email });
//       if (existingUser) {
//         return "User already exists";
//       }
  
//       const user = new UserModel(data);
//       await user.save();
  
//       return "Everything is going good";
//     } catch (error) {
//       console.error(error);
//       return "Everything is going bad";
//     }
//   };
import bcrypt from "bcryptjs";
import UserModel from "../model/User.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.js";


// signup

export const signupService = async ({ name, email, password }) => {
   

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) throw new Error("USER_EXISTS");
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const payload = { id: user._id };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};


// login

export const loginService = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("USER_NOT_FOUND");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("INVALID_PASSWORD");

    const payload = { id: user._id };

    const accessToken = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(payload);


  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};


// refresh

export const refreshTokenService = async (refreshToken) => {
  const user = await UserModel.findOne({ refreshToken });
  if (!user) throw new Error("INVALID_REFRESH_TOKEN");

  return user;
};
