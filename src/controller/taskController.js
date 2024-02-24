import taskApiService from "../service/taskService";

const readTodayFunc = async (req, res) => {
  try {
    if (req.query.idUser) {
      let data = await taskApiService.readTodayTask(req.query.idUser);
      return res.status(200).json({
        EM: data.EM, //error message
        EC: data.EC, // error code
        DT: data.DT, //data
      });
    } else {
      return res.status(200).json({
        EM: "error from server", //error message
        EC: "-1", // error code
        DT: "", //data
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

const readOverDateFunc = async (req, res) => {
  try {
    if (req.query.idUser) {
      let data = await taskApiService.readDueDateTask(req.query.idUser);
      return res.status(200).json({
        EM: data.EM, //error message
        EC: data.EC, // error code
        DT: data.DT, //data
      });
    } else {
      return res.status(200).json({
        EM: "error from server", //error message
        EC: "-1", // error code
        DT: "", //data
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
    let { title, description, duedate, idUser } = req.body;
    if (!title) {
      return res.status(200).json({
        EM: "Missing required parameters", //error message
        EC: "-1", // error code
        DT: "", //data
      });
    }

    data = await taskApiService.createNewTask(
      title,
      description,
      duedate,
      idUser
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
    let { id, title, description, duedate } = req.body;

    data = await taskApiService.updateTask(id, title, description, duedate);

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
    if (req.body.id) data = await taskApiService.deleteTask(req.body.id);
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

const readUpcomingFunc = async (req, res) => {
  try {
    if (req.query.date) {
      let data = await taskApiService.readUpcomingTasks(
        req.query.idUser,
        req.query.date
      );
      return res.status(200).json({
        EM: data.EM, //error message
        EC: data.EC, // error code
        DT: data.DT, //data
      });
    } else {
      return res.status(200).json({
        EM: "error from server", //error message
        EC: "-1", // error code
        DT: "", //data
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

module.exports = {
  readTodayFunc,
  readOverDateFunc,
  createFunc,
  updateFunc,
  deleteFunc,
  readUpcomingFunc,
};
