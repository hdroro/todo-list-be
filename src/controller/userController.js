import userApiService from "../service/userApiService";
const readFunc = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      let data = await userApiService.getUserWithPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM, //error message
        EC: data.EC, // error code
        DT: data.DT, //data
      });
    } else {
      let data = await userApiService.getAllUsers();
      return res.status(200).json({
        EM: data.EM, //error message
        EC: data.EC, // error code
        DT: data.DT, //data
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "error from server", //error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

const createFunc = async (req, res) => {
  try {
    let data;
    let { email, phone, username, password, address, gender, group } = req.body;
    if (!email || !phone || !password) {
      return res.status(200).json({
        EM: "Missing required parameters", //error message
        EC: "-1", // error code
        DT: "", //data
      });
    }

    if (password && password.length < 4) {
      return res.status(200).json({
        EM: "Your password must have more than 3 letters", //error message
        EC: "-1", // error code
        DT: "", //data
      });
    }

    data = await userApiService.createNewUser(
      email,
      password,
      username,
      phone,
      gender,
      address,
      group
    );

    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, // error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "error from server", //error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

const updateFunc = async (req, res) => {
  try {
    let data;
    let { id, username, address, gender, group } = req.body;

    data = await userApiService.updateUser(
      id,
      username,
      gender,
      address,
      group
    );

    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, // error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "error from server", //error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

const deleteFunc = async (req, res) => {
  try {
    let data;
    if (req.body.id) data = await userApiService.deleteUser(req.body.id);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, // error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "error from server", //error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

const getUserAccount = async (req, res) => {
  return res.status(200).json({
    EM: "OK", //error message
    EC: 0, // error code
    DT: {
      access_token: req.token,
      groupWithRoles: req.user.groupWithRoles,
      email: req.user.email,
      username: req.user.username,
    },
  });
};

module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
  getUserAccount,
};
