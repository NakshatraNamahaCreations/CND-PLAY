const multer = require("multer");
const upcomingmodel = require("../../Model/upcoming");

exports.list = async (req, res) => {
  const { datacount, page } = req.query;
  const limit = parseInt(datacount) || 5;
  const skip = (parseInt(page) - 1) * limit || 0;

  try {
    const upcomingDocs = await upcomingmodel.find().skip(skip).limit(limit);
    return res.json({ data: upcomingDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};
exports.getdata = async (req, res) => {
  try {
    const upcomingDocs = await upcomingmodel.find();
    return res.json({ data: upcomingDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};
exports.create = async (req, res) => {
  const { active, poster, banner } = req.body;

  try {
    const upcomingdata = new upcomingmodel({
      active,
      poster,
      banner,
    });
    const saveMovie = await upcomingdata.save();

    return res.status(200).json({ data: saveMovie });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Failed to create movie. Details: ${error.message}` });
  }
};
exports.update = async (req, res) => {
  try {
    const upcomingidd = req.params.idd;

    const { active, poster, banner } = req.body;

    const findemovie = await upcomingmodel.findOne({
      _id: upcomingidd,
    });
    if (!findemovie) {
      return res.json({ error: "No such record found" });
    }

    findemovie.active = active || findemovie.active;
    findemovie.poster = poster || findemovie.poster;
    findemovie.banner = banner || findemovie.banner;

    const updateMovie = await upcomingmodel.findOneAndUpdate(
      { _id: upcomingidd },
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
exports.deleteUpcoming = async (req, res) => {
  let idd = req.params.iid;
  try {
    const Upcoming = await upcomingmodel.findOneAndDelete({ _id: idd });
    if (Upcoming) {
      return res.status(200).json({ data: Upcoming });
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
      link: `https://api.cndplay.com/api/upcoming/update?id=${id}&active=${status}`,
    });
  } else {
    try {
      const result = await upcomingmodel.updateOne(
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
