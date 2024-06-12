const Plansmodel = require("../../Model/plan");

exports.getPlan = async (req, res) => {
  const { datacount, page } = req.query;
  const limit = parseInt(datacount) || 5;
  const skip = (parseInt(page) - 1) * limit || 0;

  try {
    const IndiaMovieDocs = await Plansmodel.find().skip(skip).limit(limit);
    return res.json({ data: IndiaMovieDocs });
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};
exports.getAllData = async (req, res) => {
  try {
    const PlanseData = await Plansmodel.find();
    if (PlanseData) {
      return res.json({ data: PlanseData });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};
exports.getbyPlanid = async (req, res) => {
  let id = req.params.id;
  try {
    const PlanseData = await Plansmodel.findById({ _id: id });
    return res.json({ data: PlanseData });
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};
exports.createPlan = async (req, res) => {
  const { planType, validity, amount, videoQuality, device } = req.body;

  try {
    const movidata = new Plansmodel({
      planType,
      validity,
      amount,
      videoQuality,
      device,
    });
    const saveMovie = await movidata.save();

    return res.status(200).json({ data: saveMovie });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Failed to create movie. Details: ${error.message}` });
  }
};
exports.updatePlan = async (req, res) => {
  try {
    const trendingidd = req.params.Planid;

    const { planType, validity, amount, videoQuality } = req.body;

    const findemovie = await Plansmodel.findOne({
      _id: trendingidd,
    });

    if (!findemovie) {
      return res.json({ error: "No such record found" });
    }
    findemovie.planType = planType || findemovie.planType;
    findemovie.validity = validity || findemovie.validity;
    findemovie.amount = amount || findemovie.amount;
    findemovie.videoQuality = videoQuality || findemovie.videoQuality;
    findemovie.device = device || findemovie.device;

    const updateMovie = await Plansmodel.findOneAndUpdate(
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
exports.deletePlan = async (req, res) => {
  let idd = req.params.iid;
  try {
    const Plans = await Plansmodel.findOneAndDelete({ _id: idd });
    if (Plans) {
      return res.status(200).json({ data: Plans });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete plan" });
  }
};
exports.changestatus = async (req, res) => {
  const data = [];
  const { status } = req.body.data.data;
  const { id } = req.body.data.filter;

  if (id === undefined || status === undefined) {
    return res.json({
      link: `https://api.cndplay.com/api/plans/update?id=${id}&active=${status}`,
    });
  } else {
    try {
      const result = await Plansmodel.updateOne(
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
