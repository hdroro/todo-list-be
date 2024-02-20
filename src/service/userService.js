import db from "../models/index";

import bcypt from "bcryptjs";

const salt = bcypt.genSaltSync(10);

const hashUserPassword = (password) => {
  //   console.log(bcypt.compareSync(password, bcypt.hashSync(password, salt)));
  return bcypt.hashSync(password, salt);
};

const createNewUser = async (email, password, username) => {
  let hashPassword = hashUserPassword(password);

  try {
    await db.User.create({
      username: username,
      email: email,
      password: hashPassword,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserList = async () => {
  let newUser = await db.User.findOne({
    where: { id: 1 },
    attributes: ["id", "username", "email"],
    include: { model: db.Group, attributes: ["id", "name", "description"] },
    raw: true,
    nest: true,
  });

  let roles = await db.Role.findAll({
    include: { model: db.Group, where: { id: 1 } },
    raw: true,
    nest: true,
  });

  let users = [];
  users = await db.User.findAll();
  return users;
  // return new Promise((resolve, reject) => {
  //   connection.query("SELECT * FROM user", (error, results, fields) => {
  //     if (error) {
  //       console.error("Error fetching user list:", error);
  //       reject(error);
  //     } else {
  //       resolve(results) ;
  //     }
  //   });
  // });
};

const getUserById = async (id) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

const deleteUser = async (id) => {
  // connection.query(
  //   "DELETE FROM user where id = ?",
  //   [id],
  //   (error, results, fields) => {
  //     if (error) {
  //       console.error("Error creating new user:", error);
  //     }
  //     console.log("User deleted successfully");
  //   }
  // );
  try {
    await db.User.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const editNewUser = async (email, username, id) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      user.email = email;
      user.username = username;

      await user.save();

      return user;
    } else {
      console.error("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error editing user:", error);
    throw error;
  }
};

module.exports = {
  createNewUser,
  getUserById,
  getUserList,
  deleteUser,
  editNewUser,
};
