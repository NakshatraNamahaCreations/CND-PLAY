const authModel = require("../Model/authentication");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongoose").Types;
exports.makeregister = async (req, res) => {
  let {
    username,
    phone,
    email,
    date_of_birth,
    gender,
    notification_token,
    profile_picture,
    plan,
    firebase_id,
    continueWatching,
    purchasedcontent,
    Likes,
    district,
    wishlist,
  } = req.body;

  let existingUser = await authModel.findOne({ phone });

  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  try {
    let createuser = new authModel({
      username,
      phone,
      email,
      date_of_birth,
      gender,
      notification_token,
      profile_picture,
      plan,
      firebase_id,
      continueWatching,
      purchasedcontent,
      Likes,
      district,
      wishlist,
    });

    let saveUser = await createuser.save();
    if (saveUser) {
      return res.status(200).json({ message: "user created successfully" });
    }
  } catch (error) {
    console.error("Error inside try block:", error);
    return res.status(500).json({ err: "err while creating user" });
  }
};


exports.findanddeletenine = async (req, res) => {
  try {
    // Fetch customers from the database
    let data = await authModel.find({});
   
    // Iterate through each customer
    const updatedCustomers = data.map(customer => {
      // Check if the phone field exists and is not null
      if (customer.phone) {
        let phoneStr = customer.phone.toString();
        console.log("phoneStr",phoneStr)

        // Check if the phone number starts with '91' and has a length of 12
        if (phoneStr.startsWith('91') && phoneStr.length === 12) {
          // Remove '91' from the beginning
          phoneStr = phoneStr.slice(2);

          // Update the customer object with the new phone number
          customer.phone = phoneStr;
        }
      } else {
        console.log(`Customer with ID ${customer._id} has an invalid phone number.`);
      }

      return customer;
    });

    // Save the updated customers back to the database
    for (let customer of updatedCustomers) {
      await authModel.findByIdAndUpdate(customer._id, { phone: customer.phone });
    }

    // Return the updated data
    return res.status(200).json({ success: true, updatedCustomers });
  } catch (error) {
    // Handle any errors that occurred during the operation
    console.error(error.message,"message");
    return res.status(500).json({ error: "Failed to retrieve or update customers" });
  }
};
exports.makelogout = async (req, res) => {
  try {
    const existingUser = await authModel.findOne({ _id });

    if (!existingUser) {
      return res.status(400).json({ error: "User does not exist" });
    }

    return res.status(200).json({ existingUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.makelogin = async (req, res) => {
  try {
    const { phone } = req.body;

    const existingUser = await authModel.findOne({ phone });

    if (!existingUser) {
      return res.status(400).json({ error: "User does not exist" });
    }

    if (!phone) {
      return res.status(400).json({ error: "Incorrect phone" });
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
      (!Likes || typeof Likes.content_id === "undefined")
    ) {
      console.error("Invalid item in the request body:", req.body);
      return res.status(400).json({ error: "Invalid item in the request body" });
    }

    let message = '';

    if (wishlist && typeof wishlist.content_id !== "undefined") {
      const existingWishlistIndex = movie.wishlist.findIndex(
        (item) => item.content_id === wishlist.content_id
      );

      if (existingWishlistIndex !== -1) {
        movie.wishlist.splice(existingWishlistIndex, 1);
        message += `Removed this content from wishlist. `;
      } else {
        movie.wishlist.push(wishlist);
        message += `Added this content to wishlist. `;
      }
    }

    if (Likes && typeof Likes.content_id !== "undefined") {
      const existingLikesIndex = movie.Likes.findIndex(
        (item) => item && item.content_id === Likes.content_id
      );

      if (existingLikesIndex !== -1) {
        movie.Likes.splice(existingLikesIndex, 1);
        message += `Removed this content from Likes. `;
      } else {
        movie.Likes.push(Likes);
        message += `Added this content to Likes. `;
      }
    }

    const updatedMovie = await movie.save();
    return res.status(200).json({ success: true, movie: updatedMovie, message: message.trim() });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// exports.UpdateWishlist = async (req, res) => {
//   const id = req.params.id;
//   const { wishlist, Likes } = req.body;

//   try {
//     let movie = await authModel.findById(id);

//     if (!movie) {
//       return res.status(404).json({ error: "Movie not found" });
//     }

//     if (!movie.wishlist) {
//       movie.wishlist = [];
//     }

//     if (!movie.Likes) {
//       movie.Likes = [];
//     }

//     if (
//       (!wishlist || typeof wishlist.content_id === "undefined") &&
//       (!Likes || !Likes || typeof Likes.content_id === "undefined")
//     ) {
//       console.error("Invalid item in the request body:", req.body);
//       return res
//         .status(400)
//         .json({ error: "Invalid item in the request body" });
//     }

//     if (wishlist && typeof wishlist.content_id !== "undefined") {
//       const existingWishlistIndex = movie.wishlist.findIndex(
//         (item) => item.content_id === wishlist.content_id
//       );

//       if (existingWishlistIndex !== -1) {
//         movie.wishlist.splice(existingWishlistIndex, 1);
//         res.json({
//           message: `Removed this content from wishlist`,
//         });
//       } else {
//         movie.wishlist.push(wishlist);
//         res.json({
//           message: `Added this content to wishlist`,
//         });
//       }
//     }

//     if (Likes && typeof Likes.content_id !== "undefined") {
//       const existingLikesIndex = movie.Likes.findIndex(
//         (item) => item && item.content_id === Likes.content_id
//       );

//       if (existingLikesIndex !== -1) {
//         movie.Likes.splice(existingLikesIndex, 1);
//         res.json({
//           message: `Removed  this content from Likes`,
//         });
//       } else {
//         movie.Likes.push(Likes);
//         res.json({
//           message: `Added this content to Likes`,
//         });
//       }
//     }

//     const updatedMovie = await movie.save();
//     return res.status(200).json({ success: true, movie: updatedMovie });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

exports.update = async (req, res) => {
  try {
    const useridd = req.params.id;

    const {
      username,
      phone,
      email,
      date_of_birth,
      gender,
      notification_token,
      plan,
      firebase_id,
      continueWatching,
      purchasedcontent,
      Likes,
      district,
      wishlist,
    } = req.body;

    const findemovie = await authModel.findOne({
      _id: useridd,
    });

    if (!findemovie) {
      return res.json({ error: "No such record found" });
    }

    findemovie.purchasedcontent =
      purchasedcontent || findemovie.purchasedcontent;
    findemovie.username = username || findemovie.username;
    findemovie.phone = phone || findemovie.phone;
    findemovie.email = email || findemovie.email;
    findemovie.date_of_birth = date_of_birth || findemovie.date_of_birth;
    findemovie.gender = gender || findemovie.gender;
    findemovie.notification_token =
      notification_token || findemovie.notification_token;
    findemovie.firebase_id = firebase_id || findemovie.firebase_id;
    findemovie.continueWatching =
      continueWatching || findemovie.continueWatching;
    findemovie.Likes = Likes || findemovie.Likes;
    findemovie.district = district || findemovie.district;
    findemovie.wishlist = wishlist || findemovie.wishlist;
    findemovie.plan = plan || findemovie.plan;
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
exports.AddPlan = async (req, res) => {
  try {
    const userId = req.params.id;
    const { plan } = req.body;

    const updatedUser = await authModel.findOneAndUpdate(
      { _id: userId },
      { $push: { plan: plan } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "No such record found" });
    }

    return res.status(200).json({
      message: "Updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ error: "Unable to update the user" });
  }
};

exports.updateContinueWatching = async (req, res) => {
  try {
    const userId = req.params.id;
    const { continueWatching } = req.body;

    const findUser = await authModel.findOne({ _id: userId });

    if (!findUser) {
      return res.json({ error: "No such record found" });
    }

    continueWatching?.forEach((newEntry) => {
      const contentId = newEntry?.contentId;
      const duration = newEntry?.duration;
      const mobile_duration = newEntry?.mobile_duration;
      const totalDuration = newEntry?.totalDuration;
      const section = newEntry?.section;
      const video = newEntry?.video;
      const banner = newEntry?.banner;
      const poster = newEntry?.poster;
      const existingIndex = findUser.continueWatching.findIndex(
        (item) => item?.contentId === contentId
      );

      if (existingIndex === -1) {
        findUser.continueWatching.push({
          contentId,
          duration,
          mobile_duration,
          totalDuration,
          section,
          video,
          banner,
          poster,
        });
      } else {
        findUser.continueWatching[existingIndex].duration = duration;
        findUser.continueWatching[existingIndex].mobile_duration =
          mobile_duration;
      }
    });

    const updatedUser = await authModel.findOneAndUpdate(
      { _id: userId },
      { $set: { continueWatching: findUser.continueWatching } },
      { new: true }
    );

    return res.status(200).json({
      message: "Updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
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

exports.getByUserId = async (req, res) => {
  try {
    const userId = req.params.idd;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    let user = await authModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserByFId = async (req, res) => {
  let id = req.params.id;

  try {
    const userdata = await authModel.findOne({ firebase_id: id });
    if (userdata) {
      res.status(200).json({ alluser: userdata });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.UpdatePurchaseContent = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate user ID
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const findUser = await authModel.findOne({ _id: userId });

    if (!findUser) {
      return res.status(404).json({ error: "No such record found" });
    }

    // Validate request body
    const { purchaseddate, expiryddate, content_id } = req.body;
    if (!purchaseddate || !expiryddate || !content_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newPurchaseId = new ObjectId();
    const newPurchase = {
      _id: newPurchaseId,
      purchaseddate,
      expiryddate,
      content_id,
    };

    // Ensure purchasedcontent is an array
    if (!Array.isArray(findUser.purchasedcontent)) {
      findUser.purchasedcontent = [];
    }

    findUser.purchasedcontent.push(newPurchase);

    const updatedUser = await authModel.findOneAndUpdate(
      { _id: userId },
      { $set: { purchasedcontent: findUser.purchasedcontent } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).json({ error: "Unable to update the user" });
    }

    return res.status(200).json({
      message: "Updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to update the user" });
  }
};
exports.getAlluser = async (req, res) => {
  try {
    let users = await authModel.find();

    if (users) {
      return res.status(200).json({ alluser: users });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
