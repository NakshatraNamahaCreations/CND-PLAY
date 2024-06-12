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

exports.getrating = async (req, res) => {
  let id = req.params.contentid;
  try {
    const ContetnDocs = await ContentModel.find({ _id: id });
    return res.status(200).json(ContetnDocs);
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};
exports.getdata = async (req, res) => {
  try {
    const ContetnDocs = await ContentModel.find({ active: true });
    return res.status(200).json({ data: ContetnDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};

exports.getdatalength = async (req, res) => {
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

  if (getbyConteidd === "null" || getbyConteidd === null) {
    return res.status(400).json({ error: "Invalid contentId" });
  }

  try {
    const ContetnDocs = await ContentModel.findOne({ _id: getbyConteidd });

    if (!ContetnDocs) {
      return res.status(404).json({ error: "Content not found" });
    }

    return res.status(200).json({ data: ContetnDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};

exports.getIndiaMovies = async (req, res) => {
  try {
    const ContetnDocs = await ContentModel.find({
      typeOfMovie: "Indie",
      active: true,
    });
    return res.status(200).json({ data: ContetnDocs });
  } catch (error) {
    console.error("Error retrieving Indie Movie data:", error);
    return res
      .status(500)
      .json({ error: "Failed to retrieve Indie Movie data" });
  }
};

exports.getUpcomingMovies = async (req, res) => {
  try {
    const ContetnDocs = await ContentModel.find({
      typeOfMovie: "Upcoming",
      active: true,
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
      typeOfMovie: "Trending",
      active: true,
    });
    return res.status(200).json({ data: ContetnDocs });
  } catch (error) {
    console.error("Error retrieving Trending Movie data:", error);
    return res
      .status(500)
      .json({ error: "Failed to retrieve Trending Movie data" });
  }
};

exports.getIndiaSeries = async (req, res) => {
  try {
    const ContetnDocs = await ContentModel.find({
      typeOfMovie: "Indie",
      active: true,
    });
    return res.status(200).json({ data: ContetnDocs });
  } catch (error) {
    console.error("Error retrieving Indie Movie data:", error);
    return res
      .status(500)
      .json({ error: "Failed to retrieve Indie Movie data" });
  }
};

exports.getUpcomingSeries = async (req, res) => {
  try {
    const ContetnDocs = await ContentModel.find({
      typeOfMovie: "Upcoming",
      active: true,
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
      typeOfMovie: "Trending",
      active: true,
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
    isrecommended,
    rating,
    active,
    section,
    video,
    type,
    title,
    isCarousel,
    searched,
    trailer,
    genres,
    subtitle,
    storyline,
    publish,
    ContentRating,
    amount,
    validity,
    views,
    likes,
    background_color,
    poster,
    titleImg,
    banner,
    mobilebanner,
    tvhomescreenbnr,
    typeOfMovie,
    mobilevideolink,
    cast,
    creaw,
    duration,
  } = req.body;
  // const uniqueToken = generateUniqueToken();

  // Append the token to the video link
  // const publicVideoLink = `${video}?token=${uniqueToken}`;
  try {
    const contentdata = new ContentModel({
      video,
      isrecommended,
      rating,
      active,
      section,
      type,
      title,
      isCarousel,
      searched,
      trailer,
      genres,
      subtitle,
      storyline,
      publish,
      ContentRating,

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
      titleImg,
      cast,
      creaw,
      duration,
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
      isrecommended,
      rating,
      active,
      section,
      video,
      type,
      title,
      isCarousel,
      searched,
      trailer,
      genres,
      subtitle,
      storyline,
      publish,
      ContentRating,
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
      titleImg,
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
    findemovie.isrecommended = isrecommended || findemovie.isrecommended;
    findemovie.rating = rating || findemovie.rating;
    findemovie.section = section || findemovie.section;
    findemovie.active = active || findemovie.active;
    findemovie.video = video || findemovie.video;
    findemovie.type = type || findemovie.type;
    findemovie.title = title || findemovie.title;
    findemovie.isCarousel = isCarousel || findemovie.isCarousel;
    findemovie.searched = searched || findemovie.searched;
    findemovie.trailer = trailer || findemovie.trailer;
    findemovie.subtitle = subtitle || findemovie.subtitle;
    findemovie.storyline = storyline || findemovie.storyline;
    findemovie.publish = publish || findemovie.publish;
    findemovie.ContentRating = ContentRating || findemovie.ContentRating;
    findemovie.views = views || findemovie.views;
    findemovie.likes = likes || findemovie.likes;
    findemovie.poster = poster || findemovie.poster;
    findemovie.titleImg = titleImg || findemovie.titleImg;
    findemovie.banner = banner || findemovie.banner;
    findemovie.amount = amount || findemovie.amount;
    findemovie.validity = validity || findemovie.validity;

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
    // console.log("error", error);
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
  const { rate, userId } = req.body;

  try {
    const existingRating = await ContentModel.findOne({
      _id: movieId,
      "ContentRating.userId": userId,
    });

    if (existingRating) {
      return res
        .status(400)
        .json({ error: "User has already rated this movie" });
    }

    const updatedMovie = await ContentModel.findByIdAndUpdate(
      { _id: movieId },
      {
        $push: {
          ContentRating: { rate: parseFloat(rate), userId: userId },
        },
      },
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
      active: true,
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
exports.RecomnedMovie = async (req, res) => {
  try {
    const recomnded = await ContentModel.find({
      isrecommended: true,
    });

    if (recomnded.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No banners found with isrecommended set to true",
      });
    }

    return res.status(200).json({ success: true, data: recomnded });
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
      active: true,
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

exports.getIndiaMoviesList = async (req, res) => {
  const { datacount, page } = req.query;
  const limit = parseInt(datacount) || 5;
  const skip = (parseInt(page) - 1) * limit || 0;

  try {
    const ContetnDocs = await ContentModel.find({ typeOfMovie: "Indie" })
      .skip(skip)
      .limit(limit);
    return res.json({ data: ContetnDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};
exports.getTrendingList = async (req, res) => {
  const { datacount, page } = req.query;
  const limit = parseInt(datacount) || 5;
  const skip = (parseInt(page) - 1) * limit || 0;

  try {
    const ContetnDocs = await ContentModel.find({
      typeOfMovie: "Trending",
    })
      .skip(skip)
      .limit(limit);
    return res.json({ data: ContetnDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};

exports.getUpcomingList = async (req, res) => {
  const { datacount, page } = req.query;
  const limit = parseInt(datacount) || 5;
  const skip = (parseInt(page) - 1) * limit || 0;

  try {
    const ContetnDocs = await ContentModel.find({
      typeOfMovie: "Upcoming",
    })
      .skip(skip)
      .limit(limit);
    return res.json({ data: ContetnDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};
exports.getSeriesList = async (req, res) => {
  const { datacount, page } = req.query;
  const limit = parseInt(datacount) || 5;
  const skip = (parseInt(page) - 1) * limit || 0;

  try {
    const ContetnDocs = await ContentModel.find({
      section: "series",
    })
      .skip(skip)
      .limit(limit);
    return res.json({ data: ContetnDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};

exports.getAllSeriesList = async (req, res) => {
  const { datacount, page } = req.query;
  const limit = parseInt(datacount) || 5;
  const skip = (parseInt(page) - 1) * limit || 0;

  try {
    const ContetnDocs = await ContentModel.find({
      typeOfMovie: "Indie Series",
    })
      .skip(skip)
      .limit(limit);
    return res.json({ data: ContetnDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};

exports.getAllSeriesForEpisode = async (req, res) => {

  try {
    const seriesdata = await ContentModel.find({
      section: "series",
    })

    return res.json({ data: seriesdata });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};
