const multer = require("multer");
const LanguagesModel = require("../../Model/language");

exports.create = async (req, res) => {
  const { lang } = req.body;
  try {
    const Languagess = new LanguagesModel({
      lang: lang,
    });
    const Languagessave = await Languagess.save();
    if (Languagessave) {
      return res.status(200).json({ data: Languagessave });
    }
  } catch (err) {
    return res.status(500).json({ err: "err while creating disticts" });
  }
};
exports.list = async (req, res) => {
  const { datacount, page } = req.query;
  const limit = parseInt(datacount) || 5;
  const skip = (parseInt(page) - 1) * limit || 0;

  try {
    const distictsDocs = await LanguagesModel.find().skip(skip).limit(limit);
    return res.json({ data: distictsDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};
exports.getdata = async (req, res) => {
  try {
    const distictsDocs = await LanguagesModel.find();
    return res.json({ data: distictsDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};
exports.update = async (req, res) => {
  try {
    const districidd = req.params.idd;
    const { lang } = req.body;
    const findemovie = await LanguagesModel.findOne({
      _id: districidd,
    });

    if (!findemovie) {
      return res.json({ error: "No such record found" });
    }

    findemovie.lang = lang || findemovie.lang;

    const updateMovie = await LanguagesModel.findOneAndUpdate(
      { _id: districidd },
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
exports.deleteLanguages = async (req, res) => {
  let idd = req.params.iid;
  try {
    const Languages = await LanguagesModel.findOneAndDelete({ _id: idd });
    if (Languages) {
      return res.status(200).json({ data: Languages });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create content" });
  }
};
