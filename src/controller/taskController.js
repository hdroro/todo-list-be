import taskApiService from "../service/taskService";
// const readFunc = async (req, res) => {
//   try {
//     if (req.query.page && req.query.limit) {
//       let { page, limit } = req.query;
//       let data = await taskApiService.getUserWithPagination(+page, +limit);
//       return res.status(200).json({
//         EM: data.EM, //error message
//         EC: data.EC, // error code
//         DT: data.DT, //data
//       });
//     } else {
//       let data = await taskApiService.getAllUsers();
//       return res.status(200).json({
//         EM: data.EM, //error message
//         EC: data.EC, // error code
//         DT: data.DT, //data
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(200).json({
//       EM: "error from server", //error message
//       EC: "-1", // error code
//       DT: "", //data
//     });
//   }
// };

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

module.exports = {
  //   readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
};
