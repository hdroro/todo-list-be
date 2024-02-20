import userService from "../service/userService";

const handleHelloWorld = (req, res) => {
  return res.render("home.ejs", { name: "hdiem" });
};

const handleUserPage = async (req, res) => {
  let userList = await userService.getUserList();
  return res.render("user.ejs", { userList });
};

const handleCreateNewUser = (req, res) => {
  let { email, password, username } = req.body;
  userService.createNewUser(email, password, username);

  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
};

const handleGetUserById = async (req, res) => {
  let userDetail = await userService.getUserById(req.params.id);
  res.render("user-edit.ejs", { userDetail });
};

const handleEditUser = async (req, res) => {
  let { email, username } = req.body;
  userService.editNewUser(email, username, req.params.id);

  return res.redirect("/user");
};
module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  handleGetUserById,
  handleEditUser,
};
