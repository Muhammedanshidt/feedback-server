// import { Router } from "express";
// import * as User from "../controllers/user.controller.js"
// const apiRouter = Router()


// apiRouter.get(
//     '/ping', User.getUser
//   );
// apiRouter.get(
//     '/auth', User.userSignup
//   );

// export default apiRouter


import express from "express";
import {
  signupUser,
  loginUser,
  refreshAccessToken,
} from "../controllers/user.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js";

const UserRouter = express.Router();

UserRouter.post("/signup", signupUser);
UserRouter.post("/login", loginUser);
UserRouter.post("/refresh-token", refreshAccessToken);

// Protected route example
UserRouter.get("/me", authMiddleware, (req, res) => {
  res.json({ userId: req.user.id });
});

export default UserRouter;
