const multer = require("multer");
const districsModel = require("../../Model/distric");

exports.create = async (req, res) => {
  const { name } = req.body;
  try {
    const districts = new districsModel({
      name: name,
    });
    const districtsave = await districts.save();
    if (districtsave) {
      return res.status(200).json({ data: districtsave });
    }
  } catch (err) {
    return res.status(500).json({ err: "err while creating disticts" });
  }
};

exports.getdata = async (req, res) => {
  const { datacount, page } = req.query;
  const limit = parseInt(datacount) || 5;
  const skip = (parseInt(page) - 1) * limit || 0;

  try {
    const distictsDocs = await districsModel.find().skip(skip).limit(limit);
    return res.json({ data: distictsDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};

exports.getAlldata = async (req, res) => {
  try {
    const distictsDocs = await districsModel.find();
    return res.json({ data: distictsDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};
exports.update = async (req, res) => {
  try {
    const districidd = req.params.idd;

    const { name, order } = req.body;

    const findemovie = await districsModel.findOne({
      _id: districidd,
    });

    if (!findemovie) {
      return res.json({ error: "No such record found" });
    }

    findemovie.order = order || findemovie.order;
    findemovie.name = name || findemovie.name;

    const updateMovie = await districsModel.findOneAndUpdate(
      { _id: districidd },
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
exports.deleteDistrict = async (req, res) => {
  let idd = req.params.iid;
  try {
    const District = await districsModel.findOneAndDelete({ _id: idd });
    if (District) {
      return res.status(200).json({ data: District });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create content" });
  }
};
