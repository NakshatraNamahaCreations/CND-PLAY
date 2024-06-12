const multer = require("multer");
const paymentgetwayModel = require("../Model/paymentgetway");
exports.createPaymentGatewaySetting = async (req, res) => {
  let {
    ch_id,
    gateway_provider,
    gateway_business_account_user_id,
    gateway_business_account_password,
    gateway_business_account_marchand_id,
    gateway_business_account_sandbox_id,
    gateway_publishable_key,
    gateway_secret_key,
  } = req.body;
  try {
    let data = new paymentgetwayModel({
      ch_id,
      gateway_provider,
      gateway_business_account_user_id,
      gateway_business_account_password,
      gateway_business_account_marchand_id,
      gateway_business_account_sandbox_id,
      gateway_publishable_key,
      gateway_secret_key,
    });
    let Savedata = await data.save();
    if (Savedata) {
      return res.status(200).json({ SavePayment: Savedata });
    }
  } catch (err) {
    return res.status(500).json({ err: "internal error" });
  }
};
exports.getPaymentGatewaySetting = async (req, res) => {
  try {
    let data = await paymentgetwayModel.find({});
    if (data) {
      return res.status(200).json({ paymentget: data });
    }
  } catch (er) {
    return res.status(500).json({ err: "server error" });
  }
};

exports.updatePaymentGatewaySetting = async (req, res) => {
  try {
    const PaymentId = req.params.PIid;

    const {
      ch_id,
      gateway_provider,
      gateway_business_account_user_id,
      gateway_business_account_password,
      gateway_business_account_marchand_id,
      gateway_business_account_sandbox_id,
      gateway_publishable_key,
      gateway_secret_key,
    } = req.body;

    const findemovie = await paymentgetwayModel.findOne({
      _id: PaymentId,
    });

    if (!findemovie) {
      return res.json({ error: "No such record found" });
    }

    findemovie.ch_id = ch_id || findemovie.ch_id;
    findemovie.gateway_secret_key =
      gateway_secret_key || findemovie.gateway_secret_key;
    findemovie.gateway_business_account_sandbox_id =
      gateway_business_account_sandbox_id ||
      findemovie.gateway_business_account_sandbox_id;
    findemovie.gateway_provider =
      gateway_provider || findemovie.gateway_provider;
    findemovie.gateway_business_account_user_id =
      gateway_business_account_user_id ||
      findemovie.gateway_business_account_user_id;
    findemovie.gateway_business_account_password =
      gateway_business_account_password ||
      findemovie.gateway_business_account_password;
    findemovie.gateway_business_account_marchand_id =
      gateway_business_account_marchand_id ||
      findemovie.gateway_business_account_marchand_id;
    findemovie.gateway_publishable_key =
      gateway_publishable_key || findemovie.gateway_publishable_key;
    const updateMovie = await Episodemodel.findOneAndUpdate(
      { _id: PaymentId },
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
exports.deletePayementCredential = async (req, res) => {
  let idd = req.params.iid;
  try {
    const Payment = await paymentgetwayModel.findOneAndDelete({ _id: idd });
    if (Payment) {
      return res.status(200).json({ data: Payment });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create content" });
  }
};

exports.changeStatusPaymentGatewaySetting = async (req, res) => {
  const data = [];
  const { status } = req.body.data.data;
  const { id } = req.body.data.filter;
  console.log(status, "status");
  if (id === undefined || status === undefined) {
    return res.json({
      link: `https://api.cndplay.com/api/paymentcredentialsetup/update?id=${id}&active=${status}`,
    });
  } else {
    try {
      const result = await paymentgetwayModel.updateOne(
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
