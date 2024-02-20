import loginRegisterService from "../service/loginRegisterService";

const testApi = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "test api",
  });
};

const handleRegister = async (req, res) => {
  try {
    let { email, username, password, fullname } = req.body;
    if (!email || !username || !password) {
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

    //service: create user
    let data = await loginRegisterService.registerNewUser(req.body);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, // error code
      DT: "", //data
    });
  } catch (error) {
    return res.status(200).json({
      EM: "error from server", //error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    let data = await loginRegisterService.handleUserLogin(req.body);
    if (data && data.DT && data.DT.access_token) {
      res.cookie("jwt", data.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }
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

const handleLogout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      EM: "ok", //error message
      EC: 0, // error code
      DT: "", //data
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

module.exports = {
  testApi,
  handleRegister,
  handleLogin,
  handleLogout,
};
