const express = require("express");
const crypto = require("crypto");
require("dotenv").config();
const axios = require("axios");
const authModel = require("../../Model/authentication");
const OrderInfoModel = require("../../Model/paymentgatway/OrderConfirmed");
const ClubModal = require("../../Model/offer");
const { PAYU_MERCHANT_KEY, PAYU_MERCHANT_SALT } = process.env;
const { ObjectId } = require("mongoose").Types;

if (!PAYU_MERCHANT_KEY || !PAYU_MERCHANT_SALT) {
  throw new Error(
    "PayU merchant key and salt must be defined in the environment variables."
  );
}

const updatePurchaseContent = async (userId, itemid, validity, amount) => {
  try {
    if (!ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    const findUser = await authModel.findOne({ _id: userId });
    if (!findUser) {
      throw new Error("No such record found");
    }

    const currentDate = new Date();
    const validityInHours = validity * 24;
    const expirationDate = new Date(
      currentDate.getTime() + validityInHours * 60 * 60 * 1000
    );

    const purchaseddate = currentDate.toISOString();
    const expiryddate = expirationDate.toISOString();
    const content_id = itemid;

    if (!purchaseddate || !expiryddate || !content_id) {
      throw new Error("Missing required fields");
    }

    const newPurchaseId = new ObjectId();
    const newPurchase = {
      _id: newPurchaseId,
      purchaseddate: purchaseddate,
      expiryddate: expiryddate,
      content_id: content_id,
    };

    if (!Array.isArray(findUser.purchasedcontent)) {
      findUser.purchasedcontent = [];
    }

    findUser.purchasedcontent.push(newPurchase);

    const updatedUser = await authModel.findOneAndUpdate(
      { _id: userId },
      { $set: { purchasedcontent: findUser.purchasedcontent } },
      { new: true }
    );

    let CreateOrderInfo = new OrderInfoModel({
      fullname: findUser.username,
      amount: amount,
      userid: userId,
      purchseId: itemid,
      pruchaseDate: purchaseddate,
      purchseType: "Content",
    });
    await CreateOrderInfo.save();

    if (!updatedUser) {
      throw new Error("Unable to update the user");
    }

    return true;
  } catch (error) {
    console.error("Error updating user:", error.message);
    return false;
  }
};

const UpdatePlan = async (userId, planid, validity, planType, price) => {
  try {
    if (!ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    const findUser = await authModel.findOne({ _id: userId });
    if (!findUser) {
      throw new Error("No such record found");
    }

    const currentDate = new Date();
    const validityInHours = validity * 24;
    const expirationDate = new Date(
      currentDate.getTime() + validityInHours * 60 * 60 * 1000
    );

    const purchaseddate = currentDate.toISOString();
    const expiryddate = expirationDate.toISOString();
    const plan_id = planid;

    if (!purchaseddate || !expiryddate || !plan_id) {
      throw new Error("Missing required fields");
    }

    const newPlanId = new ObjectId();
    const newPlan = {
      _id: newPlanId,
      plan_id: plan_id,
      validity: validity,
      planType: planType,
      expiryddate: expiryddate,
      purchaseddate: purchaseddate,
      amount: price,
    };

    if (!Array.isArray(findUser.plan)) {
      findUser.plan = [];
    }

    findUser.plan.push(newPlan);

    const updatedUser = await authModel.findOneAndUpdate(
      { _id: userId },
      { $set: { plan: findUser.plan } },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("Unable to update the user");
    }

    let CreateOrderInfo = new OrderInfoModel({
      fullname: findUser.username,
      amount: price,
      userid: userId,
      purchseId: planid,
      pruchaseDate: purchaseddate,
      purchseType: "Plan",
    });
    await CreateOrderInfo.save();
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw new Error("Unable to update the user");
  }
};

const updateClub = async (userId, itemid, validity, price) => {
  try {
    if (!ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }
    const findUser = await authModel.findOne({ _id: userId });
    if (!findUser) {
      throw new Error("No such record found");
    }

    const currentDate = new Date();
    const validityInHours = validity * 24;
    const expirationDate = new Date(
      currentDate.getTime() + validityInHours * 60 * 60 * 1000
    );
    const purchaseddate = currentDate.toISOString();
    const expiryddate = expirationDate.toISOString();
    if (!purchaseddate || !expiryddate) {
      throw new Error("Missing required fields");
    }

    const findClub = await ClubModal.findOne({ _id: itemid });
    if (!findClub) {
      throw new Error("No club found with the given ID");
    }

    const newPurchases = [];

    for (const content of findClub.Contents) {
      const newPurchase = {
        _id: new ObjectId(),
        purchaseddate: purchaseddate,
        expiryddate: expiryddate,
        content_id: content.contentId,
      };
      newPurchases.push(newPurchase);
    }

    if (!Array.isArray(findUser.purchasedcontent)) {
      findUser.purchasedcontent = [];
    }

    // Concatenate new purchases to the user's existing purchased content
    findUser.purchasedcontent = findUser.purchasedcontent.concat(newPurchases);

    // Update the user's purchased content in the database
    const updatedUser = await authModel.findOneAndUpdate(
      { _id: userId },
      { $set: { purchasedcontent: findUser.purchasedcontent } },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("Unable to update the user");
    }
    let CreateOrderInfo = new OrderInfoModel({
      fullname: findUser.username,
      amount: price,
      userid: userId,
      purchseId: itemid,
      pruchaseDate: purchaseddate,
      purchseType: "Club",
    });
    await CreateOrderInfo.save();
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw new Error("Unable to update the user");
  }
};

class PaymentController {
  async initiatePayment(req, res) {
    try {
      const {
        amount,
        productinfo,
        firstname,
        email,
        phone,
        surl,
        txnid,
        furl,
      } = req.body;

      const hashString = `${PAYU_MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${PAYU_MERCHANT_SALT}`;
      const hash = crypto.createHash("sha512").update(hashString).digest("hex");

      const paymentData = {
        key: PAYU_MERCHANT_KEY,
        txnid: txnid,
        amount: amount,
        productinfo: productinfo,
        firstname: firstname,
        email: email,
        phone: phone,
        surl: surl,
        furl: furl,
        hash: hash,
        enforce_paymethod:
          "creditcard|debitcard|netbanking|neftrtgs|emi|upi|cashcard|sodexo|bnpl|qr",
      };

      return res.json({
        paymentUrl: "https://secure.payu.in/_payment",
        params: paymentData,
      });
    } catch (error) {
      console.error("Payment Initialization Error:", error);
      res.status(500).json({
        message: "Payment Initialization Error",
        error: error.message,
      });
    }
  }

  async verifyPurchasePayment(req, res) {
    try {
      console.log("call back api---");
      const { txnid, userid, itemid, validity, amount } = req.params;
      const key = PAYU_MERCHANT_KEY;
      const command = "verify_payment";
      const var1 = txnid;

      const hashString = `${key}|${command}|${var1}|${PAYU_MERCHANT_SALT}`;
      const hash = crypto.createHash("sha512").update(hashString).digest("hex");

      const encodedParams = new URLSearchParams();
      encodedParams.set("key", key);
      encodedParams.set("command", command);
      encodedParams.set("var1", var1);
      encodedParams.set("hash", hash);

      const options = {
        method: "POST",
        url: "https://info.payu.in/merchant/postservice?form=2",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: encodedParams,
      };

      const response = await axios.request(options);

      if (response.data.status === 1) {
        const updateStatus = await updatePurchaseContent(
          userid,
          itemid,
          validity,
          amount
        );
        if (updateStatus) {
          return res.redirect("https://www.cndplay.com/success");
        } else {
          return res.redirect("https://www.cndplay.com/failure");
        }
      } else {
        return res.redirect("https://www.cndplay.com/failure");
      }
    } catch (error) {
      console.error("Payment Verification Error:", error);
      return res.status(500).json({
        message: "Payment Verification Error",
        error: error.message,
      });
    }
  }

  async verifyClubPayment(req, res) {
    try {
      const { txnid, userid, itemid, validity, amount } = req.params;
      const key = PAYU_MERCHANT_KEY;
      const command = "verify_payment";
      const var1 = txnid;

      const hashString = `${key}|${command}|${var1}|${PAYU_MERCHANT_SALT}`;
      const hash = crypto.createHash("sha512").update(hashString).digest("hex");

      const encodedParams = new URLSearchParams();
      encodedParams.set("key", key);
      encodedParams.set("command", command);
      encodedParams.set("var1", var1);
      encodedParams.set("hash", hash);

      const options = {
        method: "POST",
        url: "https://info.payu.in/merchant/postservice?form=2",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: encodedParams,
      };

      const response = await axios.request(options);

      if (response.data.status === 1) {
        await updateClub(userid, itemid, validity, amount);
        return res.redirect("https://www.cndplay.com/success");
      } else {
        return res.redirect("https://www.cndplay.com/failure");
      }
    } catch (error) {
      console.error("Payment Verification Error:", error);
      return res.status(500).json({
        message: "Payment Verification Error",
        error: error.message,
      });
    }
  }
  async verifyPlanPayment(req, res) {
    try {
      const { txnid, userId, planid, validity, plantype, amount } = req.params;
      const key = PAYU_MERCHANT_KEY;
      const command = "verify_payment";
      const var1 = txnid;

      const hashString = `${key}|${command}|${var1}|${PAYU_MERCHANT_SALT}`;
      const hash = crypto.createHash("sha512").update(hashString).digest("hex");

      const encodedParams = new URLSearchParams();
      encodedParams.set("key", key);
      encodedParams.set("command", command);
      encodedParams.set("var1", var1);
      encodedParams.set("hash", hash);

      const options = {
        method: "POST",
        url: "https://info.payu.in/merchant/postservice?form=2",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: encodedParams,
      };

      const response = await axios.request(options);

      if (response.data.status === 1) {
        await UpdatePlan(userId, planid, validity, plantype, amount);
        return res.redirect("https://www.cndplay.com/success");
      } else {
        return res.redirect("https://www.cndplay.com/failure");
      }
    } catch (error) {
      console.error("Payment Verification Error:", error);
      return res.status(500).json({
        message: "Payment Verification Error",
        error: error.message,
      });
    }
  }

  async getAllOrder(req, res) {
    try {
      const data = await OrderInfoModel.find();
      if (data) {
        return res.status(200).json(data);
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
  async AddOrder(req, res) {
    let { fullname, amount, userid, purchseId, pruchaseDate, purchseType } =
      req.body;
    try {
      let CreateOrderInfo = new OrderInfoModel({
        fullname,
        amount,
        userid,
        purchseId,
        pruchaseDate,
        purchseType,
      });
      await CreateOrderInfo.save();
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

module.exports = new PaymentController();
