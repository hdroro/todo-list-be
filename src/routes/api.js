import express from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import taskController from "../controller/taskController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTActions";
const router = express.Router();

const initApiRoutes = (app) => {
  router.all("*", checkUserJWT);

  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  router.post("/logout", apiController.handleLogout);

  router.post("/task/create", taskController.createFunc);
  router.post("/task/update", taskController.updateFunc);
  router.post("/task/delete", taskController.deleteFunc);

  router.get("/account", userController.getUserAccount);

  return app.use("/api/v1/", router);
};

export default initApiRoutes;
