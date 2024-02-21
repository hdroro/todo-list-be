import db from "../models/index";

const createNewTask = async (title, description, duedate, idUser) => {
  try {
    await db.Task.create({
      title: title,
      description: description,
      duedate: duedate,
      idUser: idUser,
    });

    return {
      EM: "Create a task successfully!",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};

const updateTask = async (id, title, description, duedate) => {
  try {
    const task = await db.Task.findOne({
      where: {
        id: id,
      },
    });
    if (task) {
      task.title = title;
      task.description = description;
      task.duedate = duedate;

      await task.save();

      return {
        EM: "Edit a task successfully!",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something went wrong with the service",
      EC: 1,
      DT: [],
    };
  }
};

const deleteTask = async (id) => {
  try {
    let task = await db.Task.findOne({
      where: { id: id },
    });

    if (task) {
      await task.destroy();
      return {
        EM: "Delete task successfully!",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "Task not exist",
        EC: 2,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Error from service",
      EC: 2,
      DT: [],
    };
  }
};

module.exports = {
  createNewTask,
  updateTask,
  deleteTask,
};
