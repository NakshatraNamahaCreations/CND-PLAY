const multer = require("multer");
const genersModel = require("../../Model/geners");

exports.list = async (req, res) => {
  const { datacount, page } = req.query;
  const limit = parseInt(datacount) || 5;
  const skip = (parseInt(page) - 1) * limit || 0;

  try {
    const generssDocs = await genersModel.find().skip(skip).limit(limit);
    return res.json({ data: generssDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};

exports.getdata = async (req, res) => {
  try {
    const generssDocs = await genersModel.find();
    return res.json({ data: generssDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};
exports.create = async (req, res) => {
  const { active, name } = req.body;
  try {
    const genrs = new genersModel({
      active,
      name,
    });
    const genrssave = await genrs.save();

    return res.status(200).json({ data: genrssave });
  } catch (err) {
    return res.status(500).json({ err: "internal error" });
  }
};
exports.update = async (req, res) => {
  try {
    const genersidd = req.params.idd;

    const { active, name, popularity } = req.body;

    const findemovie = await genersModel.findOne({
      _id: genersidd,
    });

    if (!findemovie) {
      return res.json({ error: "No such record found" });
    }

    findemovie.active = active || findemovie.active;
    findemovie.name = name || findemovie.name;
    findemovie.popularity = popularity || findemovie.popularity;

    const updateMovie = await genersModel.findOneAndUpdate(
      { _id: genersidd },
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

exports.deleteGeners = async (req, res) => {
  let idd = req.params.iid;
  try {
    const Geners = await genersModel.findOneAndDelete({ _id: idd });
    if (Geners) {
      return res.status(200).json({ data: Geners });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create content" });
  }
};

exports.changestatus = async (req, res) => {
  const data = [];
  const { status } = req.body.data.data;
  const { id } = req.body.data.filter;

  if (id === undefined || status === undefined) {
    return res.json({
      link: `https://api.cndplay.com/api/genres/update?id=${id}&active=${status}`,
    });
  } else {
    try {
      const result = await genersModel.updateOne(
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
