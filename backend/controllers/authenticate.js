const authModel = require("../Model/authentication");
const bcrypt = require("bcrypt");

exports.makeregister = async (req, res) => {
  let {
    ch_id,
    // user_type,
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
      // user_type,
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
exports.makelogout = async (req, res) => {
  try {
    const existingUser = await authModel.findOne({ _id });

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
exports.makelogin = async (req, res) => {
  try {
    const { password, username } = req.body;

    const existingUser = await authModel.findOne({ username });
    console.log(password, "password");
    console.log(existingUser.password, "existingUser");
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

exports.UpdateWishlist = async (req, res) => {
  const id = req.params.id;
  const { wishlist, Likes } = req.body;

  try {
    let movie = await authModel.findById(id);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    if (!movie.wishlist) {
      movie.wishlist = [];
    }

    if (!movie.Likes) {
      movie.Likes = [];
    }

    if (
      (!wishlist || typeof wishlist.content_id === "undefined") &&
      (!Likes || !Likes || typeof Likes.content_id === "undefined")
    ) {
      console.error("Invalid item in the request body:", req.body);
      return res
        .status(400)
        .json({ error: "Invalid item in the request body" });
    }

    if (wishlist && typeof wishlist.content_id !== "undefined") {
      const existingWishlistIndex = movie.wishlist.findIndex(
        (item) => item.content_id === wishlist.content_id
      );

      if (existingWishlistIndex !== -1) {
        movie.wishlist.splice(existingWishlistIndex, 1);
      } else {
        movie.wishlist.push(wishlist);
      }
    }

    if (Likes && typeof Likes.content_id !== "undefined") {
      const existingLikesIndex = movie.Likes.findIndex(
        (item) => item && item.content_id === Likes.content_id
      );

      if (existingLikesIndex !== -1) {
        movie.Likes.splice(existingLikesIndex, 1);
      } else {
        movie.Likes.push(Likes);
      }
    }

    const updatedMovie = await movie.save();
    return res.status(200).json({ success: true, movie: updatedMovie });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.update = async (req, res) => {
  try {
    const useridd = req.params.id;

    const {
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

    const findemovie = await authModel.findOne({
      _id: useridd,
    });

    if (!findemovie) {
      return res.json({ error: "No such record found" });
    }

    findemovie.username = username || findemovie.username;
    findemovie.full_name = full_name || findemovie.full_name;
    findemovie.country_code = country_code || findemovie.country_code;
    findemovie.phone = phone || findemovie.phone;
    findemovie.email = email || findemovie.email;
    findemovie.date_of_birth = date_of_birth || findemovie.date_of_birth;
    findemovie.gender = gender || findemovie.gender;
    findemovie.notification_token =
      notification_token || findemovie.notification_token;
    findemovie.password = password || findemovie.password;
    findemovie.agree_terms = agree_terms || findemovie.agree_terms;
    findemovie.plan = plan || findemovie.plan;
    findemovie.firebase_id = firebase_id || findemovie.firebase_id;
    findemovie.continueWatching =
      continueWatching || findemovie.continueWatching;
    findemovie.purchasedcontent =
      purchasedcontent || findemovie.purchasedcontent;
    findemovie.Myrating = Myrating || findemovie.Myrating;
    findemovie.Likes = Likes || findemovie.Likes;
    findemovie.accountCompleted =
      accountCompleted || findemovie.accountCompleted;
    findemovie.avatar = avatar || findemovie.avatar;
    findemovie.district = district || findemovie.district;
    findemovie.lastLogin = lastLogin || findemovie.lastLogin;
    findemovie.watchingNow = watchingNow || findemovie.watchingNow;
    findemovie.wishlist = wishlist || findemovie.wishlist;

    const updatedUser = await authModel.findOneAndUpdate(
      { _id: useridd },
      { $set: findemovie },
      { new: true }
    );

    return res.status(200).json({
      message: "Updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ error: "Unable to update the user" });
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
exports.getWishlistById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await authModel.findOne(
      { "wishlist.userid": userId },
      { wishlist: 1 }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const WishList = user.wishlist;

    if (WishList && WishList.length > 0) {
      return res.status(200).json({ WishList: WishList });
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
exports.getByUserId = async (req, res) => {
  let userid = req.params.idd;

  try {
    const userdata = await authModel.findOne({ _id: userid });
    console.log(userdata, "userdata");
    res.status(200).json({ uniqueuser: userdata });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserByFId = async (req, res) => {
  let id = req.params.id;

  try {
    const userdata = await authModel.findOne({ firebase_id: id });

    res.status(200).json({ user: userdata });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
