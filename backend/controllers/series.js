const Seriesmodel = require("../Model/series");

exports.createSeries = async (req, res) => {
  const { ch_id, series_name, description } = req.body;

  let file = req.file?.filename;
  try {
    if (!file) {
      throw new Error("Please upload a image");
    }
    const Seriess = new Seriesmodel({
      ch_id,
      series_name,
      description,
      thumbnail: file,
    });

    const Seriessssave = await Seriess.save();
    if (Seriessssave) {
      return res
        .status(200)
        .json({ data: Seriessssave, message: "Create Series Successfully" });
    }
  } catch (err) {
    return res.status(500).json({ err: "internal error" });
  }

  // }
};

exports.getSeries = async (req, res) => {
  try {
    const Series = await Seriesmodel.find({});
    if (Series) {
      return res.status(200).json({ data: Series });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create content" });
  }
};

exports.updateSeries = async (req, res) => {
  try {
    const Seriesidd = req.params.Seriesid;

    const { ch_id, series_name, description } = req.body;
    let file = req.file ? req.file.filename : null;
    const findemovie = await Seriesmodel.findOne({
      _id: Seriesidd,
    });

    if (!findemovie) {
      return res.json({ error: "No such record found" });
    }

    findemovie.ch_id = ch_id || findemovie.ch_id;
    findemovie.series_name = series_name || findemovie.series_name;
    findemovie.description = description || findemovie.description;
    findemovie.thumbnail = file || findemovie.thumbnail;
    const updateMovie = await Seriesmodel.findOneAndUpdate(
      { _id: Seriesidd },
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
exports.deleteSeries = async (req, res) => {
  let idd = req.params.iid;
  try {
    const Series = await Seriesmodel.findOneAndDelete({ _id: idd });
    if (Series) {
      return res.status(200).json({ data: Series });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create content" });
  }
};
exports.changeStatusSeries = async (req, res) => {
  const data = [];
  const { status } = req.body.data.data;
  const { id } = req.body.data.filter;

  if (id === undefined || status === undefined) {
    return res.json({
      link: `https://api.cndplay.com/api/series/update?id=${id}&active=${status}`,
    });
  } else {
    try {
      const result = await Seriesmodel.updateOne(
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