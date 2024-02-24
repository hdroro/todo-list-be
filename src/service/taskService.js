import { Op } from "sequelize";
import db from "../models/index";
import { convertToYearDMY } from "../utils/dateFormat";
const {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  startOfDay,
} = require("date-fns");

const readTodayTask = async (idUser) => {
  try {
    let task = await db.Task.findAll({
      attributes: ["id", "title", "description", "duedate"],
      where: {
        idUser: idUser,
        duedate: { [Op.eq]: new Date(convertToYearDMY(new Date())) },
      },
      order: [["duedate", "DESC"]],
      raw: true,
      nest: true,
    });
    if (task) {
      return {
        EM: "get data success",
        EC: 0,
        DT: task,
      };
    } else {
      return {
        EM: "something wrongs with service",
        EC: 1,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};

const readDueDateTask = async (idUser) => {
  try {
    let task = await db.Task.findAll({
      attributes: ["id", "title", "description", "duedate"],
      where: {
        idUser: idUser,
        duedate: { [Op.lt]: new Date(convertToYearDMY(new Date())) }, // Use Op.lt (less than) operator for dates
      },
      order: [["duedate", "DESC"]],
      raw: true,
      nest: true,
    });
    if (task) {
      return {
        EM: "get data success",
        EC: 0,
        DT: task,
      };
    } else {
      return {
        EM: "something wrongs with service",
        EC: 1,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};

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
      attributes: ["id", "title", "description", "duedate", "idUser"],
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
    const task = await db.Task.findOne({
      attributes: ["id", "title", "description", "duedate", "idUser"],
      where: {
        id: id,
      },
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

const readUpcomingTasks = async (idUser, date) => {
  try {
    const targetDate = new Date(date);

    const firstDayOfWeek = startOfWeek(targetDate, { weekStartsOn: 1 });
    const lastDayOfWeek = endOfWeek(targetDate, { weekStartsOn: 1 });

    const tasks = await db.Task.findAll({
      attributes: ["id", "title", "description", "duedate", "idUser"],
      where: {
        idUser: idUser,
        duedate: {
          [Op.between]: [firstDayOfWeek, lastDayOfWeek],
          [Op.gte]: new Date(convertToYearDMY(new Date())),
        },
      },
    });

    const taskDictionary = {};
    tasks.forEach((task) => {
      const taskDate = format(new Date(task.duedate), "d MMM ‧ EEEE");
      if (!taskDictionary[taskDate]) {
        taskDictionary[taskDate] = [];
      }
      taskDictionary[taskDate].push(task);
    });

    // Tạo một mảng chứa tất cả các ngày trong tuần
    const allDaysOfWeek = eachDayOfInterval({
      start: firstDayOfWeek,
      end: lastDayOfWeek,
    });

    // Tạo mảng kết quả
    const formattedTasks = allDaysOfWeek.map((day) => {
      if (day >= startOfDay(new Date())) {
        const dateString = format(day, "d MMM ‧ EEEE");
        return {
          date: dateString,
          tasks: taskDictionary[dateString] || {
            duedate: new Date(convertToYearDMY(day)),
          },
        };
      }
    });

    return {
      EM: "get upcoming data success",
      EC: 0,
      DT: formattedTasks,
    };
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
  readTodayTask,
  readDueDateTask,
  createNewTask,
  updateTask,
  deleteTask,
  readUpcomingTasks,
};
