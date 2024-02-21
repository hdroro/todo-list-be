import db from "../models/index";
import bcypt from "bcryptjs";
import { Op } from "sequelize";
import { createJWT } from "../middleware/JWTActions";
require("dotenv").config();

const salt = bcypt.genSaltSync(10);

const hashUserPassword = (password) => {
  //   console.log(bcypt.compareSync(password, bcypt.hashSync(password, salt)));
  return bcypt.hashSync(password, salt);
};

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });

  if (user) return true;
  return false;
};

const checkUsernameExist = async (username) => {
  let user = await db.User.findOne({
    where: { username: username },
  });

  if (user) return true;
  return false;
};

const registerNewUser = async (rawUserData) => {
  try {
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist) {
      return {
        EM: "The email is already exist!",
        EC: 1,
      };
    }
    let isUsernameExist = await checkUsernameExist(rawUserData.username);
    if (isUsernameExist) {
      return {
        EM: "The username is already exist!",
        EC: 1,
      };
    }

    let hashPassword = hashUserPassword(rawUserData.password);
    await db.User.create({
      email: rawUserData.email,
      username: rawUserData.username,
      fullname: rawUserData.fullname,
      password: hashPassword,
    });

    return {
      EM: "Register successfully!",
      EC: 0,
    };
  } catch (error) {
    return {
      EM: "Something wrongs in service",
      EC: -2,
    };
  }
};

const checkPassword = (inputPassword, hashPassword) => {
  return bcypt.compareSync(inputPassword, hashPassword);
};

const handleUserLogin = async (rawData) => {
  try {
    const user = await db.User.findOne({
      where: {
        [Op.or]: [
          { email: rawData.valueLogin },
          { username: rawData.valueLogin },
        ],
      },
    });

    if (user) {
      let isCorrectPassword = checkPassword(rawData.password, user.password);
      if (isCorrectPassword) {
        let payload = {
          email: user.email,
          username: user.username,
          fullname: user.fullname,
        };
        let token = createJWT(payload);
        return {
          EM: "OK",
          EC: 0,
          DT: {
            access_token: token,
            id: user.id,
            email: user.email,
            username: user.username,
            fullname: user.fullname,
          },
        };
      }
    }

    // console.log(
    //   "Not found user with email/phone",
    //   rawData.valueLogin,
    //   "password",
    //   rawData.password
    // );
    return {
      EM: "Your email/username or password is incorrect!",
      EC: 1,
      DT: "",
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerNewUser,
  handleUserLogin,
};
