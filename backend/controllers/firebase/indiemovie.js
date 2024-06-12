const multer = require("multer");
const indie_movieModel = require("../../Model/indiamovie");

exports.list = async (req, res) => {
  const { datacount, page } = req.query;
  const limit = parseInt(datacount) || 5;
  const skip = (parseInt(page) - 1) * limit || 0;

  try {
    const IndiaMovieDocs = await indie_movieModel
      .find()
      .skip(skip)
      .limit(limit);
    return res.json({ data: IndiaMovieDocs });
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};
exports.getdata = async (req, res) => {
  try {
    const IndiaMovieDocs = await indie_movieModel.find();
    return res.status(200).json({ data: IndiaMovieDocs });
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};
exports.create = async (req, res) => {
  const {
    fromYoutube,
    carouselOrder,
    rating,
    active,
    section,
    video,
    type,
    title,
    isCarousel,
    duration,
    searched,
    trailer,
    genres,
    subtitle,
    storyline,
    publish,
    contentRating,
    amount,
    validity,
    views,
    likes,
    background_color,
    poster,
    banner,titleImg
  } = req.body;

  try {
    const movidata = new indie_movieModel({
      fromYoutube,
      carouselOrder,
      rating,
      active,
      section,
      video,
      type,
      title,
      isCarousel,
      duration,
      searched,
      trailer,
      genres,
      subtitle,
      storyline,
      publish,
      contentRating,
      pricing: {
        amount,
        validity,
      },
      views,
      likes,
      background_color,
      poster,
      banner,titleImg
    });
    const saveMovie = await movidata.save();

    return res.status(200).json({ data: saveMovie });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Failed to create movie. Details: ${error.message}` });
  }
};

exports.update = async (req, res) => {
  try {
    const trendingidd = req.params.idd;

    const {
      fromYoutube,
      carouselOrder,
      rating,
      active,
      section,
      video,
      type,
      title,
      isCarousel,
      duration,
      searched,
      trailer,
      genres,
      subtitle,
      storyline,
      publish,
      contentRating,
      pricing,
      amount,
      validity,
      views,
      likes,
      background_color,
      poster,
      banner,titleImg
    } = req.body;

    const findemovie = await indie_movieModel.findOne({
      _id: trendingidd,
    });

    if (!findemovie) {
      return res.json({ error: "No such record found" });
    }

    findemovie.fromYoutube = fromYoutube || findemovie.fromYoutube;
    findemovie.carouselOrder = carouselOrder || findemovie.carouselOrder;
    findemovie.rating = rating || findemovie.rating;
    findemovie.section = section || findemovie.section;
    findemovie.active = active || findemovie.active;
    findemovie.video = video || findemovie.video;
    findemovie.type = type || findemovie.type;
    findemovie.title = title || findemovie.title;
    findemovie.isCarousel = isCarousel || findemovie.isCarousel;
    findemovie.duration = duration || findemovie.duration;
    findemovie.searched = searched || findemovie.searched;
    findemovie.trailer = trailer || findemovie.trailer;
    findemovie.genres = genres || findemovie.genres;
    findemovie.subtitle = subtitle || findemovie.subtitle;
    findemovie.storyline = storyline || findemovie.storyline;
    findemovie.publish = publish || findemovie.publish;
    findemovie.contentRating = contentRating || findemovie.contentRating;
    findemovie.views = views || findemovie.views;
    findemovie.likes = likes || findemovie.likes;
    findemovie.background_color =
      background_color || findemovie.background_color;
    findemovie.poster = poster || findemovie.poster;
    findemovie.banner = banner || findemovie.banner;
    findemovie.titleImg = titleImg || findemovie.titleImg;
    
    findemovie.pricing.amount = amount || findemovie.pricing.amount;
    findemovie.pricing.validity = validity || findemovie.pricing.validity;

    const updateMovie = await indie_movieModel.findOneAndUpdate(
      { _id: trendingidd },
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

exports.deleteIndiaMovie = async (req, res) => {
  let idd = req.params.iid;
  try {
    const IndiaMovie = await indie_movieModel.findOneAndDelete({ _id: idd });
    if (IndiaMovie) {
      return res.status(200).json({ data: IndiaMovie });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create content" });
  }
};

exports.changestatus = async (req, res) => {
  const data = [];
  const { status } = req.body.data;
  const { id } = req.body.filter;

  if (id === undefined || status === undefined) {
    return res.json({
      link: `https://api.cndplay.com/api/indiemovie/update?id=${id}&active=${status}`,
    });
  } else {
    try {
      const result = await indie_movieModel.updateOne(
        { _id: id },
        { $set: { active: status === 1 ? true : false } }
      );

      if (result.nModified > 0) {
        data.push({ id: id });
        return res.json({ data: data });
      } else {
        return res.json({ error: "Document not found" });
      }
    } catch (error) {
      console.error("Error updating document:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};
