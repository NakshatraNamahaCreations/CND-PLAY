const ContentModel = require("../../Model/Content");

exports.list = async (req, res) => {
  const { datacount, page } = req.query;
  const limit = parseInt(datacount) || 5;
  const skip = (parseInt(page) - 1) * limit || 0;

  try {
    const ContetnDocs = await ContentModel.find().skip(skip).limit(limit);
    return res.json({ data: ContetnDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};

exports.getdata = async (req, res) => {
  try {
    const ContetnDocs = await ContentModel.find({});
    return res.status(200).json({ data: ContetnDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};

exports.getbyContentId = async (req, res) => {
  let getbyConteidd = req.params.idd;
  try {
    const ContetnDocs = await ContentModel.findById({ _id: getbyConteidd });
    return res.status(200).json({ data: ContetnDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};

exports.getIndiaMovies = async (req, res) => {
  try {
    const ContetnDocs = await ContentModel.find({
      typeOfMovie: "India's Movie",
    });
    return res.status(200).json({ data: ContetnDocs });
  } catch (error) {
    console.error("Error retrieving India's Movie data:", error);
    return res
      .status(500)
      .json({ error: "Failed to retrieve India's Movie data" });
  }
};

exports.getUpcomingMovies = async (req, res) => {
  try {
    const ContetnDocs = await ContentModel.find({
      typeOfMovie: "Upcoming Movie",
    });
    return res.status(200).json({ data: ContetnDocs });
  } catch (error) {
    console.error("Error retrieving Upcoming Movie data:", error);
    return res
      .status(500)
      .json({ error: "Failed to retrieve Upcoming Movie data" });
  }
};

exports.getTrendingMovies = async (req, res) => {
  try {
    const ContetnDocs = await ContentModel.find({
      typeOfMovie: "Trending Movie",
    });
    return res.status(200).json({ data: ContetnDocs });
  } catch (error) {
    console.error("Error retrieving Trending Movie data:", error);
    return res
      .status(500)
      .json({ error: "Failed to retrieve Trending Movie data" });
  }
};

//   Series

exports.getIndiaSeries = async (req, res) => {
  try {
    const ContetnDocs = await ContentModel.find({
      typeOfMovie: "India's Series",
    });
    return res.status(200).json({ data: ContetnDocs });
  } catch (error) {
    console.error("Error retrieving India's Movie data:", error);
    return res
      .status(500)
      .json({ error: "Failed to retrieve India's Movie data" });
  }
};

exports.getUpcomingSeries = async (req, res) => {
  try {
    const ContetnDocs = await ContentModel.find({
      typeOfMovie: "Upcoming Series",
    });
    return res.status(200).json({ data: ContetnDocs });
  } catch (error) {
    console.error("Error retrieving Upcoming Movie data:", error);
    return res
      .status(500)
      .json({ error: "Failed to retrieve Upcoming Movie data" });
  }
};

exports.getTrendingSeries = async (req, res) => {
  try {
    const ContetnDocs = await ContentModel.find({
      typeOfMovie: "Trending Series",
    });
    return res.status(200).json({ data: ContetnDocs });
  } catch (error) {
    console.error("Error retrieving Trending Movie data:", error);
    return res
      .status(500)
      .json({ error: "Failed to retrieve Trending Movie data" });
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
    banner,
    mobilebanner,
    tvhomescreenbnr,
    typeOfMovie,
    mobilevideolink,
  } = req.body;

  try {
    const contentdata = new ContentModel({
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
      banner,
      mobilebanner,
      tvhomescreenbnr,
      typeOfMovie,
      mobilevideolink,
    });
    const savedContent = await contentdata.save();

    return res.status(200).json({ data: savedContent });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create content" });
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
      banner,
      mobilebanner,
      tvhomescreenbnr,
      typeOfMovie,
      mobilevideolink,
    } = req.body;

    const findemovie = await ContentModel.findOne({
      _id: trendingidd,
    });

    if (!findemovie) {
      return res.json({ error: "No such record found" });
    }

    findemovie.background_color = background_color?.startsWith("#")
      ? background_color?.substring(1)
      : background_color || findemovie.background_color;
    findemovie.mobilevideolink = mobilevideolink || findemovie.mobilevideolink;
    findemovie.typeOfMovie = typeOfMovie || findemovie.typeOfMovie;
    findemovie.mobilebanner = mobilebanner || findemovie.mobilebanner;
    findemovie.tvhomescreenbnr = tvhomescreenbnr || findemovie.tvhomescreenbnr;
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
    findemovie.poster = poster || findemovie.poster;
    findemovie.banner = banner || findemovie.banner;
    findemovie.pricing.amount = amount || findemovie.pricing.amount;
    findemovie.pricing.validity = validity || findemovie.pricing.validity;
    const updateMovie = await ContentModel.findOneAndUpdate(
      { _id: trendingidd },
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
exports.deleteContent = async (req, res) => {
  let idd = req.params.iid;
  try {
    const Content = await ContentModel.findOneAndDelete({ _id: idd });
    if (Content) {
      return res.status(200).json({ data: Content });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create content" });
  }
};
exports.changestatus = async (req, res) => {
  const data = [];
  const { status } = req.body.data.data;
  const { id } = req.body.data.filter;
  console.log(status, "status");
  if (id === undefined || status === undefined) {
    return res.json({
      link: `http://localhost:8081/api/contents/update?id=${id}&active=${status}`,
    });
  } else {
    try {
      const result = await ContentModel.updateOne(
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

exports.PostMoviesview = async (req, res) => {
  const movieId = req.params.id;

  try {
    const updatedMovie = await ContentModel.findByIdAndUpdate(
      { _id: movieId },
      { $inc: { views: 1 } },
      { new: true }
    );
    return res.status(200).json({ success: true, movie: updatedMovie });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.PostLikes = async (req, res) => {
  const movieId = req.params.id;

  try {
    const updatedMovie = await ContentModel.findByIdAndUpdate(
      { _id: movieId },
      { $inc: { likes: 1 } },
      { new: true }
    );

    return res.status(200).json({ success: true, movie: updatedMovie });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.PostRatings = async (req, res) => {
  const movieId = req.params.id;

  try {
    const updatedMovie = await ContentModel.findByIdAndUpdate(
      { _id: movieId },
      { $inc: { contentRating: 1 } },
      { new: true }
    );

    return res.status(200).json({ success: true, movie: updatedMovie });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getMostWatchedMovies = async (req, res) => {
  try {
    const mostViewedMovies = await ContentModel.find({ views: { $gt: 10 } });
    if (!mostViewedMovies) {
      return res.status(404).send("No movies found");
    }
    return res.status(200).json({ success: true, movies: mostViewedMovies });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBannersdata = async (req, res) => {
  try {
    const BannerShow = await ContentModel.find({
      isCarousel: true,
      section: "movie",
    });

    if (BannerShow.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No banners found with isCarousel set to true",
      });
    }

    return res.status(200).json({ success: true, banners: BannerShow });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

exports.LatestReleased = async (req, res) => {
  try {
    const currentDate = new Date();
    const threeMonthsAgo = new Date(currentDate);
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

    const latestContent = await ContentModel.find({
      publish: { $gte: threeMonthsAgo.toISOString() },
    });

    if (latestContent.length === 0) {
      return res.status(404).json({
        error: "No content found that was released within the last 3 months",
      });
    }

    return res.status(200).json({ success: true, content: latestContent });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
