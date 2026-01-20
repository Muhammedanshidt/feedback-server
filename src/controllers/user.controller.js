

  import {
    signupService,
    loginService,
    refreshTokenService,
  } from "../services/user.service.js";
  import {
    generateAccessToken,
    verifyRefreshToken,
  } from "../utils/jwt.js";
  

  /* ================= SIGNUP ================= */
  export const signupUser = async (req, res) => {
console.log("from front")
console.log(req.body)
    try {
      const { accessToken, refreshToken } = await signupService(req.body);

      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: false, // true in production (HTTPS)
          sameSite: "strict",
          maxAge: 15 * 60 * 1000, // 15 minutes
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .status(201)
        .json({ message: "Signup successful" });
    } catch (error) {
      if (error.message === "USER_EXISTS")
        return res.status(409).json({ message: "User already exists" });
  
      return res.status(500).json({ message: "Server error" });
    }
  };
  
  /* ================= LOGIN ================= */

  export const loginUser = async (req, res) => {
    try {
      const { accessToken, refreshToken } = await loginService(req.body);

      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({ message: "Login successful" });
    } catch (error) {
      if (error.message === "USER_NOT_FOUND")
        return res.status(404).json({ message: "User not found" });
  
      if (error.message === "INVALID_PASSWORD")
        return res.status(401).json({ message: "Invalid credentials" });
  
      return res.status(500).json({ message: "Server error" });
    }
  };
  
  /* ============== REFRESH TOKEN ============== */
  export const refreshAccessToken = async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken)
        return res.status(401).json({ message: "No refresh token" });
  
      const decoded = verifyRefreshToken(refreshToken);
      await refreshTokenService(refreshToken);
  
      const newAccessToken = generateAccessToken({ id: decoded.id });
  
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });
  
      res.json({ message: "Access token refreshed" });
    } catch (error) {
      res.status(403).json({ message: "Invalid refresh token" });
    }
  };
  
  