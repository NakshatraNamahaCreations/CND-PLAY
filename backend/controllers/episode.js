const Episodemodel = require("../Model/episode");

exports.createEpisode = async (req, res) => {
  const {
    episodes_name,
    storyline,
    title,
    series_id,
    video,
    banner,
    episodeNo,
    duration,
    releaseDate,
    releaseTime,
    active,
  } = req.body;

  let file = req.file?.filename;
  try {
    if (!file) {
      throw new Error("Please upload a image");
    }
    const Episodes = new Episodemodel({
      episodes_name,
      storyline,
      series_id,
      thumbnail: file,
      video,
      title,
      banner,
      episodeNo,
      duration,
      releaseDate,
      releaseTime,
      active,
    });

    const Episodesssave = await Episodes.save();
    if (Episodesssave) {
      return res
        .status(200)
        .json({ data: Episodesssave, message: "Create Episode Successfully" });
    }
  } catch (err) {
    return res.status(500).json({ err: "internal error" });
  }

  // }
};
exports.list = async (req, res) => {
  const { datacount, page } = req.query;
  const limit = parseInt(datacount) || 5;
  const skip = (parseInt(page) - 1) * limit || 0;

  try {
    const Episode = await Episodemodel.find().skip(skip).limit(limit);
    return res.json({ data: Episode });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};
exports.getEpisode = async (req, res) => {
  try {
    const Episode = await Episodemodel.find({});
    if (Episode) {
      return res.status(200).json(Episode);
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create content" });
  }
};

exports.updateEpisode = async (req, res) => {
  try {
    const Episodeidd = req.params.Episodeidd;

    const {
      episodes_name,
      storyline,
      title,
      series_id,
      banner,
      episodeNo,
      duration,
      video,
      active,
      releaseDate,
    } = req.body;
    let file = req.file ? req.file.filename : null;
    const findemovie = await Episodemodel.findOne({
      _id: Episodeidd,
    });

    if (!findemovie) {
      return res.json({ error: "No such record found" });
    }

    findemovie.episodes_name = episodes_name || findemovie.episodes_name;
    findemovie.storyline = storyline || findemovie.storyline;
    findemovie.title = title || findemovie.title;
    findemovie.series_id = series_id || findemovie.series_id;
    findemovie.video = video || findemovie.video;
    findemovie.banner = banner || findemovie.banner;
    findemovie.episodeNo = episodeNo || findemovie.episodeNo;
    findemovie.duration = duration || findemovie.duration;
    findemovie.active = active || findemovie.active;
    findemovie.releaseDate = releaseDate || findemovie.releaseDate;

    if (findemovie.thumbnail) {
      findemovie.thumbnail = file || findemovie.thumbnail;
    }
    const updateMovie = await Episodemodel.findOneAndUpdate(
      { _id: Episodeidd },
      findemovie,
      { new: true }
    );

    return res.status(200).json({
      message: "Updated successfully",
      data: updateMovie,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Unable to update the movie" });
  }
};
exports.deleteEpisode = async (req, res) => {
  let idd = req.params.iid;
  try {
    const Episode = await Episodemodel.findOneAndDelete({ _id: idd });
    if (Episode) {
      return res.status(200).json({ data: Episode });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create content" });
  }
};

exports.changeStatusEpisodes = async (req, res) => {
  const data = [];
  const { status } = req.body.data.data;
  const { id } = req.body.data.filter;

  try {
    const result = await Episodemodel.updateOne(
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
