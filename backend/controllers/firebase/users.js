const userModel = require("../../Model/user");

exports.create = async (req, res) => {
  let {
    organization_id,
    email,
    phone,
    country,
    state,
    zip,
    address,
    username,
    password,
    is_admin,
    // firebase_id,plan,
    // continueWatching,
    // purchasedcontent,
    // Myrating,
    // accountCompleted,
    // avatar,
    // createdOn,
    // district,
    // lastLogin,
    // messageToken,
    // watchingNow,
    // wishlist,
    // Likes,
  } = req.body;

  try {
    let CreateUserData = new userModel({
      organization_id,
      email,
      phone,
      country,
      state,
      zip,
      address,
      username,
      password,
      is_admin,
      // firebase_id, plan,
      // continueWatching,
      // purchasedcontent,
      // Myrating,
      // Likes,
      // accountCompleted,
      // avatar,
      // createdOn,
      // district,
      // email,
      // lastLogin,
      // messageToken,
      // watchingNow,
      // wishlist,
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

    const {
      phone,
      country,
      state,
      zip,
      address,
      username,
      password,
     
      is_admin, 
 
    } = req.body;

    const findemovie = await userModel.findOne({
      _id: userid,
    });
    if (!findemovie) {
      return res.json({ error: "No such record found" });
    }

    findemovie.phone = phone || findemovie.phone;
    findemovie.country = country || findemovie.country;
    findemovie.state = state || findemovie.state;
    findemovie.zip = zip || findemovie.zip;
    findemovie.address = address || findemovie.address;
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
    console.log("error", error);
    return res.status(500).json({ error: "Unable to update the movie" });
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

