import db from "../models/index";

import bcypt from "bcryptjs";

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

const checkUsername = async (username) => {
  let user = await db.User.findOne({
    where: { username: username },
  });

  if (user) return true;
  return false;
};

const createNewUser = async (email, password, username, fullname) => {
  try {
    let isEmailExist = await checkEmailExist(email);
    if (isEmailExist) {
      return {
        EM: "The email is already exist!",
        EC: 1,
      };
    }
    let isUsernameExist = await checkUsername(username);
    if (isUsernameExist) {
      return {
        EM: "The username is already exist!",
        EC: 1,
      };
    }

    let hashPassword = hashUserPassword(password);

    await db.User.create({
      username: username,
      email: email,
      password: hashPassword,
      fullname: fullname,
    });

    return {
      EM: "Create a user successfully!",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};

const checkPassword = (inputPassword, hashPassword) => {
  return bcypt.compareSync(inputPassword, hashPassword);
};

const handleChangePassword = async (rawData) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: rawData.id,
      },
    });

    if (user) {
      let isCorrectPassword = checkPassword(rawData.oldPassword, user.password);
      if (isCorrectPassword) {
        let hashPassword = hashUserPassword(rawData.newPassword);
        user.password = hashPassword;

        await user.save();

        return {
          EM: "Change Password successfully!",
          EC: 0,
          DT: [],
        };
      } else {
        return {
          EM: "Your Old Password is incorrect!",
          EC: 2,
          DT: "",
        };
      }
    }
    return {
      EM: "Not found",
      EC: 1,
      DT: "",
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewUser,
  handleChangePassword,
};
