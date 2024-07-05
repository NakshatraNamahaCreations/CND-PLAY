const userModel = require("../../Model/user");

exports.create = async (req, res) => {
  let { email, phone, username, password, is_admin } = req.body;

  try {
    let CreateUserData = new userModel({
      email,
      phone,
      username,
      password,
      is_admin,
    });

    let saveUser = await CreateUserData.save();

    if (saveUser) {
      return res
        .status(200)
        .json({ data: saveUser, message: "user created succesfully" });
    }
  } catch {
    return res.status(500).json({ err: "err while creating user" });
  }
};


exports.getdata = async (req, res) => {
  try {
    const userdata = await userModel.find({});
    if (userdata) {
      return res.status(200).json({ data: userdata });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create content" });
  }
};

exports.update = async (req, res) => {
  try {
    const userid = req.params.useridd;

    const { phone, username, password, is_admin, email } = req.body;

    const findemovie = await userModel.findOne({
      _id: userid,
    });
    if (!findemovie) {
      return res.json({ error: "No such record found" });
    }

    findemovie.email = email || findemovie.email;
    findemovie.username = username || findemovie.username;
    findemovie.password = password || findemovie.password;
    findemovie.is_admin = is_admin || findemovie.is_admin;
    const updateMovie = await userModel.findOneAndUpdate(
      { _id: userid },
      findemovie,
      { new: true }
    );
    return res.json({
      message: "Updated successfully",
      date: updateMovie,
    });
  } catch (error) {
    // console.log("error", error);
    return res.status(500).json({ error: "Unable to update the movie" });
  }
};
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userModel.findOne({ password });
             console.log(existingUser,"existingUser")
    if (!existingUser) {
      return res.status(400).json({ error: "User does not exist" });
    }

    if (!password) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    return res.status(200).json({ existingUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.deleteuser = async (req, res) => {
  const userid = req.params.deleid;
  try {
    const userdata = await userModel.findOneAndDelete({ _id: userid });
    if (userdata) {
      return res
        .status(200)
        .json({ message: "Deleted successfully", user: userdata });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete user" });
  }
};
