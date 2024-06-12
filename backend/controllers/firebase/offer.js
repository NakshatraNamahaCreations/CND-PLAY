const OfferModal = require("../../Model/offer");

exports.getOffer = async (req, res) => {
  const { datacount, page } = req.query;
  const limit = parseInt(datacount) || 5;
  const skip = (parseInt(page) - 1) * limit || 0;

  try {
    const IndiaMovieDocs = await OfferModal.find().skip(skip).limit(limit);
    return res.json({ data: IndiaMovieDocs });
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};
exports.getAllData = async (req, res) => {
  try {
    const OfferseData = await OfferModal.find({ active: true });
    if (OfferseData) {
      return res.json(OfferseData);
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};

exports.createOffer = async (req, res) => {
  const { title, subtitle, price, image, Contents, validity, active, poster } =
    req.body;

  try {
    const offerData = new OfferModal({
      title,
      subtitle,
      price,
      image,
      Contents,
      validity,
      active,
      poster,
    });
    const offersdata = await offerData.save();

    return res.status(200).json({ data: offersdata });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Failed to create club. Details: ${error.message}` });
  }
};
exports.updateOffer = async (req, res) => {
  try {
    const offerid = req.params.id;

    const {
      title,
      subtitle,
      price,
      image,
      Contents,
      validity,
      active,
      poster,
    } = req.body;

    const findOffer = await OfferModal.findOne({
      _id: offerid,
    });

    if (!findOffer) {
      return res.json({ error: "No such record found" });
    }
    findOffer.title = title || findOffer.title;
    findOffer.subtitle = subtitle || findOffer.subtitle;
    findOffer.price = price || findOffer.price;
    findOffer.image = image || findOffer.image;
    findOffer.Contents = Contents || findOffer.Contents;
    findOffer.validity = validity || findOffer.validity;
    findOffer.active = active || findOffer.active;

    findOffer.poster = poster || findOffer.poster;
    const updateclub = await OfferModal.findOneAndUpdate(
      { _id: offerid },
      findOffer,
      { new: true }
    );

    return res.json({
      message: "Updated successfully",
      date: updateclub,
    });
  } catch (error) {
    // console.log("error", error);
    return res.status(500).json({ error: "Unable to update the movie" });
  }
};
exports.deleteOffer = async (req, res) => {
  let idd = req.params.iid;
  try {
    const Offers = await OfferModal.findOneAndDelete({ _id: idd });
    if (Offers) {
      return res.status(200).json({ data: Offers });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete Offer" });
  }
};
exports.changestatus = async (req, res) => {
  const data = [];
  const { status } = req.body.data.data;
  const { id } = req.body.data.filter;

  try {
    const result = await OfferModal.updateOne(
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
