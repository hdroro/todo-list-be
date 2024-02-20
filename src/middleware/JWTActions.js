require("dotenv").config();
import jwt from "jsonwebtoken";

const nonSecurePaths = ["/login", "/register", "/logout"];
const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key);
  } catch (error) {
    console.log(error);
  }
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key, { expiresIn: process.env.JWT_EXPIRES_IN });
  } catch (error) {
    console.log(error);
  }
  return decoded;
};

const getToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};
const checkUserJWT = (req, res, next) => {
  try {
    if (nonSecurePaths.includes(req.path)) return next();
    let tokenFromHeader = getToken(req);

    let cookies = req.cookies;
    if ((cookies && cookies.jwt) || tokenFromHeader) {
      let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
      let decoded = verifyToken(token);

      if (decoded) {
        req.user = decoded;
        req.token = token;
        next();
      } else {
        return res.status(401).json({
          EC: -1,
          DT: "",
          EM: "Not authenticated the user!",
        });
      }
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Not authenticated the user!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path) || req.path === "/account")
    return next();

  if (req.user) {
    let email = req.user.email;
    let roles = req.user.groupWithRoles;

    let currentUrl = req.path;
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: `You don't have permission to access this resource...!`,
      });
    }

    let canAcces = roles.some(
      (item) =>
        item.Roles.url === currentUrl || currentUrl.includes(item.Roles.url)
    );
    if (canAcces) {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: `You don't have permission to access this resource...!`,
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated the user!",
    });
  }
};

module.exports = { createJWT, verifyToken, checkUserJWT, checkUserPermission };
