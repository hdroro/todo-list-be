import express from "express";
import apiController from "../controller/apiController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTActions";
const router = express.Router();

const initApiRoutes = (app) => {
  router.all("*", checkUserJWT, checkUserPermission);

  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  router.post("/logout", apiController.handleLogout);

  return app.use("/api/v1/", router);
};

export default initApiRoutes;
