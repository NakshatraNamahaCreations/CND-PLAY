const trendingModel = require("../../Model/trending");

exports.list = async (req, res) => {
  const { datacount, page } = req.query;
  const limit = parseInt(datacount) || 5;
  const skip = (parseInt(page) - 1) * limit || 0;

  try {
    const trendingDocs = await trendingModel.find().skip(skip).limit(limit);
    return res.json({ data: trendingDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};

exports.getdata = async (req, res) => {
  try {
    const trendingDocs = await trendingModel.find();
    return res.json({ data: trendingDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};

exports.create = async (req, res) => {
  const { poster, title, section, type, amount, validity, active, banner ,titleImg} =
    req.body;

  try {
    const trending = new trendingModel({
      poster,
      title,
      section,
      type,
      pricing: {
        amount,
        validity,
      },
      active,
      banner,titleImg
    });
    let trendingdata = await trending.save();
    return res.status(200).json({ data: trendingdata });
  } catch (err) {
    return res.status(500).json({ err: "internal error" });
  }

  //   }
};

exports.update = async (req, res) => {
  try {
    const trendingidd = req.params.idd;

    const {
      poster,
      title,
      section,
      pricing,
      type,
      amount,
      validity,
      active,
      banner,titleImg
    } = req.body;

    const findemovie = await trendingModel.findOne({
      _id: trendingidd,
    });

    if (!findemovie) {
      return res.json({ error: "No such record found" });
    }
    findemovie.banner = banner || findemovie.banner;
    findemovie.poster = poster || findemovie.poster;
    findemovie.titleImg = titleImg || findemovie.titleImg;
    
    findemovie.title = title || findemovie.title;
    findemovie.section = section || findemovie.section;
    findemovie.type = type || findemovie.type;
    findemovie.active = active || findemovie.active;
    findemovie.pricing.amount = amount || findemovie.pricing.amount;
    findemovie.pricing.validity = validity || findemovie.pricing.validity;

    const updateMovie = await trendingModel.findOneAndUpdate(
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

exports.deleteTrending = async (req, res) => {
  let idd = req.params.iid;
  try {
    const Trending = await trendingModel.findOneAndDelete({ _id: idd });
    if (Trending) {
      return res.status(200).json({ data: Trending });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete trending movies" });
  }
};

exports.changestatus = async (req, res) => {
  const data = [];
  const { status } = req.body.data.data;
  const { id } = req.body.data.filter;

  if (id === undefined || status === undefined) {
    return res.json({
      link: `https://api.cndplay.com/api/trending/update?id=${id}&active=${status}`,
    });
  } else {
    try {
      const result = await trendingModel.updateOne(
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
