import authRouter from "./auth-router.js";
import userRouter from "./user-router.js";
// body
const route = (app) => {
  //authRouter
  app.use("/api/auth",authRouter);

  // userRouter
  app.use("/api/user", userRouter);

  // Server is running
  app.use("/", (req, res) => {
    res.status(200).json("Server is running");
  });
};

export default route;
