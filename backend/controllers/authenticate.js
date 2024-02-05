const authModel = require("../Model/authentication");
const bcrypt = require("bcrypt");

exports.makeregister = async (req, res) => {
  let {
    ch_id,
    username,
    full_name,
    country_code,
    phone,
    email,
    date_of_birth,
    gender,
    notification_token,
    profile_picture,
    password,
    agree_terms,
    fieldCount,
    insertId,
    message,
    serverStatus,
    warningCount,
    plan,
    firebase_id,
    continueWatching,
    purchasedcontent,
    Myrating,
    Likes,
    accountCompleted,
    avatar,
    createdOn,
    district,
    lastLogin,
    messageToken,
    watchingNow,
    wishlist,
  } = req.body;

  let existingUser = await authModel.findOne({ ch_id, password, username });

  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  try {
    let createuser = new authModel({
      ch_id,
      username,
      full_name,
      country_code,
      phone,
      email,
      date_of_birth,
      gender,
      notification_token,
      profile_picture,
      password,
      agree_terms,
      fieldCount,
      insertId,
      message,
      serverStatus,
      warningCount,
      plan,
      firebase_id,
      continueWatching,
      purchasedcontent,
      Myrating,
      Likes,
      accountCompleted,
      avatar,
      createdOn,
      district,
      email,
      lastLogin,
      messageToken,
      watchingNow,
      wishlist,
    });

    let saveUser = await createuser.save();
    if (saveUser) {
      return res.status(200).json({ message: "user created succesfully" });
    }
  } catch {
    return res.status(500).json({ err: "err while creating user" });
  }
};

exports.makelogin = async (req, res) => {
  try {
    const { password, username } = req.body;

    const existingUser = await authModel.findOne({ username });

    if (!existingUser) {
      return res.status(400).json({ error: "User does not exist" });
    }

    if (existingUser.password !== password) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    return res.status(200).json({ existingUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.PostLikes = async (req, res) => {
  let { content_id, userid } = req.body;
  let id = req.params.id;

  try {
    const movie = await authModel.findById(id);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const isLiked = movie.Likes.some((like) => like.content_id === content_id);

    if (isLiked) {
      const updatedMovie = await authModel.findOneAndUpdate(
        { _id: id },
        { $pull: { Likes: { content_id } } },
        { new: true }
      );

      return res.status(200).json({ success: true, movie: updatedMovie });
    } else {
      const updatedMovie = await authModel.findOneAndUpdate(
        { _id: id },
        { $addToSet: { Likes: { content_id, userid } } },
        { new: true }
      );

      return res.status(200).json({ success: true, movie: updatedMovie });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.getLikesById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await authModel.findOne(
      { "Likes.userid": userId },
      { Likes: 1 }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const likedMovies = user.Likes;

    if (likedMovies && likedMovies.length > 0) {
      return res.status(200).json({ likedMovies: likedMovies });
    } else {
      return res
        .status(404)
        .json({ error: "No liked movies found for the user" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAlluser = async (req, res) => {
  try {
    const likedMovies = await authModel.find();

    res.status(200).json({ alluser: likedMovies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
// findemovie.plan = plan || findemovie.plan;
// findemovie.firebase_id = firebase_id || findemovie.firebase_id;
// findemovie.continueWatching =
//   continueWatching || findemovie.continueWatching;
// findemovie.purchasedcontent =
//   purchasedcontent || findemovie.purchasedcontent;
// findemovie.Myrating = Myrating || findemovie.Myrating;
// findemovie.Likes = Likes || findemovie.Likes;
// findemovie.accountCompleted =
//   accountCompleted || findemovie.accountCompleted;
// findemovie.avatar = avatar || findemovie.avatar;
// findemovie.createdOn = createdOn || findemovie.createdOn;
// findemovie.district = district || findemovie.district;
// findemovie.email = email || findemovie.email;
// findemovie.lastLogin = lastLogin || findemovie.lastLogin;
// findemovie.messageToken = messageToken || findemovie.messageToken;
// findemovie.watchingNow = watchingNow || findemovie.watchingNow;
// findemovie.wishlist = wishlist || findemovie.wishlist;
