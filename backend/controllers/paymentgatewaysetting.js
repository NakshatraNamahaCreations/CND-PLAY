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
      link: `http://localhost:8081/api/paymentcredentialsetup/update?id=${id}&active=${status}`,
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

// const express = require("express");
// const multer = require("multer");
// const fetch = require('node-fetch');
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// const app = express();
// const loginStatus2=require("../middleware/LoginStatus")

// exports.generate = (req, res) => {
//   // return res.json({ data: 1 });
//     const params = [];
//     const q = "select * from payment_gateway_settings WHERE status = 1";
//     db.query(q, params, (err, data) => {
//       if (err) return res.json({ error: err.sqlMessage });
//       else {
//         if(data.length > 0) {
//           return res.json({ data: data });
//         } else {
//           return res.json({ res: 0, msg: "No settings found" });
//         }
//       }
//     });
// }

// exports.fileUploader = (req, res) => {
//     const data = req.query;
//     console.log(req.file);
//     req.file.path = `${process.env.DB_PROTOCOL}${process.env.DB_HOST}:${process.env.DB_PORT}/${req.file.path}`;
//     return res.json({ data:[req.file] });
//   }

//   exports.createPaymentGatewaySetting = (req, res) => {
//       const data = req.body.data;
//       let params = [];
//       let columns = '';
//       let values = '';
//       let counter = 0;
//       for(var k in data) {
//         if(counter > 0) {
//           columns += ', ';
//           values += ', ';
//         }
//         columns += k;
//         values += '?';
//         params.push(data[k]);
//         counter++;
//       }
//       const q = "INSERT INTO `payment_gateway_settings` ("+columns+") VALUES ("+values+")";
//       db.query(q, params, (err, data) => {
//       //   console.log(err, data);
//         if (err) return res.json({ error: err.sqlMessage });
//         else return res.json({ data });
//       });
//   }

//   exports.getPaymentGatewaySetting = (req, res) => {
//     const data = req.body.data;
//     let params = [];
//     let where = '';
//     let counter = 0;
//     for(var k in data) {
//       if(counter == 0) {
//         where += ' WHERE ';
//       } else {
//         where += ' AND ';
//       }
//       where += k+' LIKE ? ';
//       params.push("%"+data[k]+"%");
//       counter++;
//     }
//     const q = "select * from payment_gateway_settings "+where;
//     db.query(q, params, (err, data) => {
//     //   console.log(err, data);
//       if (err) return res.json({ error: err.sqlMessage });
//       else return res.json({ data });
//     });
//   }

// exports.updatePaymentGatewaySetting = (req, res) => {
//   const data = req.body.data.data;
//   const filter = req.body.data.filter;
//   let params = [];
//   let set_data = '';
//   let where = '';
//   let counter = 0;
//   for(var k in data) {
//     if(counter > 0) {
//       set_data += ', ';
//     } else {
//       set_data += ' SET ';
//     }
//     set_data += k + ' = ? ';
//     params.push(data[k]);
//     counter++;
//   }
//   counter = 0;
//   for(var k in filter) {
//     if(counter > 0) {
//       where += ' AND ';
//     } else {
//       where += ' WHERE ';
//     }
//     where += k + ' = ? ';
//     params.push(filter[k]);
//     counter++;
//   }
//   const q = "UPDATE `payment_gateway_settings` " + set_data + ' ' + where;
//   // console.log(q, params)
//   db.query(q, params, (err, data) => {
//   //   console.log(err, data);
//     if (err) return res.json({ error: err.sqlMessage });
//     else return res.json({ data });
//   });
// }

// exports.changeStatusPaymentGatewaySetting = (req, res) => {
//   const data = req.body.data.data;
//   const filter = req.body.data.filter;
//   let params = [];
//   let set_data = '';
//   let where = '';
//   let counter = 0;
//   for(var k in data) {
//     if(counter > 0) {
//       set_data += ', ';
//     } else {
//       set_data += ' SET ';
//     }
//     set_data += k + ' = ? ';
//     params.push(data[k]);
//     counter++;
//   }
//   counter = 0;
//   for(var k in filter) {
//     if(counter > 0) {
//       where += ' AND ';
//     } else {
//       where += ' WHERE ';
//     }
//     where += k + ' = ? ';
//     params.push(filter[k]);
//     counter++;
//   }
//   const q = "UPDATE `payment_gateway_settings` " + set_data + ' ' + where;
//   console.log(q, params)
//   db.query(q, params, (err, data) => {
//   //   console.log(err, data);
//     if (err) return res.json({ error: err.sqlMessage });
//     else return res.json({ data });
//   });
// }

// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------

// exports.getDefaultPayUsetting = (req, res) => {
//     // pool.getConnection((err, connection) => {
//     //     if (err) throw err;
//     //     connection.query('SELECT * FROM payment_gateway_settings WHERE is_default = 1 AND gateway_provider = "PayU"', (err, rows) => {
//     //         connection.release();
//     //         if (!err) {
//     //             res.end(JSON.stringify({ title: "Payment Gateway Settings", rows }));
//     //         }
//     //         else
//     //             console.log(err)
//     //     })
//     // })
// };

// exports.getPaymentgatewaysetting = (req, res) => {
//     // pool.getConnection((err, connection) => {
//     //     if (err) throw err;
//     //     connection.query('SELECT * FROM payment_gateway_settings', (err, rows) => {
//     //         connection.release();
//     //         if (!err) {
//     //             res.render('paymentgatewaysetting.html', { title: "Payment Gateway Settings", rows });
//     //         }
//     //         else
//     //             console.log(err)
//     //     })
//     // })
// };

// app.use(loginStatus2)
// exports.postPaymentgatewaysetting = (req, res) => {
//     // console.log(req.body)
//     // pool.getConnection((err, connection) => {
//     //     if (err) throw err;
//     //     connection.query('SELECT * FROM payment_gateway_settings WHERE id = ?', [req.body.id], (err, rows) => {
//     //         // connection.release();
//     //         if(rows.length > 0) {
//     //             pool.query(
//     //                 'UPDATE payment_gateway_settings SET is_default = ? WHERE id <> ?',
//     //                 [0, req.body.id],(err,rows)=>{
//     //                 // connection.release();
//     //                 if(!err) {
//     //                     pool.query(
//     //                         'UPDATE payment_gateway_settings SET is_default = ? WHERE id = ?',
//     //                         [1, req.body.id],(err,rows)=>{
//     //                         connection.release();
//     //                         if(!err){
//     //                             res.send({success: true});
//     //                         }
//     //                         else {
//     //                             console.log(err)
//     //                         }
//     //                     })
//     //                 }
//     //                 else {
//     //                     connection.release();
//     //                     console.log(err)
//     //                 }
//     //             })
//     //         } else {
//     //             connection.release();
//     //             res.send({success: true, msg: 'No Records found.'});
//     //         }
//     //     })
//     // })
// };
// exports.getPaymentgatewaysettingEdit = (req, res) => {
//     // console.log('SELECT * FROM payment_gateway_settings WHERE id = ', req.params.id)
//     // pool.getConnection((err, connection) => {
//     //     if (err) throw err;
//     //     connection.query('SELECT * FROM payment_gateway_settings WHERE id = ?',[req.params.id], (err, rows) => {
//     //         connection.release();
//     //         console.log("rows", rows)
//     //         if (!err)
//     //             res.render('paymentgatewaysettingEdit.html', { title: "Edit Payment Gateway Settings", rows, id: req.params.id });
//     //         else
//     //             console.log(err)
//     //     })
//     // })
// };
// exports.postPaymentgatewaysettingEdit = (req, res) => {
//     // const now = new Date();
//     // const jsonDate = now.toJSON();
//     // const then = new Date(jsonDate);
//     // // const storage = multer.diskStorage({
//     // //     destination(req, file, cb) {
//     // //       cb(null, `assets/uploads/categories`);
//     // //     },
//     // //     filename(req, file, cb) {
//     // //         cb(null, file.originalname);
//     // //     },
//     // //   });

//     // // const upload = multer({ storage : storage}).any();
//     // // upload(req,res,async function(err) {
//     // //     if(err) throw err;
//     // //     else {
//     //         console.log(req.body)
//     //         pool.getConnection((err, connection) => {
//     //             if(err) throw err;
//     //             pool.query(
//     //                 'UPDATE payment_gateway_settings SET gateway_provider = ? ,gateway_business_account_user_id = ? ,gateway_business_account_password = ? , gateway_business_account_marchand_id = ? , gateway_business_account_sandbox_id = ? , gateway_publishable_key = ? , gateway_secret_key = ? WHERE id = ?',
//     //                 [req.body.gateway_provider,req.body.gateway_business_account_user_id,req.body.gateway_business_account_password,req.body.gateway_business_account_marchand_id,req.body.gateway_business_account_sandbox_id,req.body.gateway_publishable_key,req.body.gateway_secret_key,req.body.id],(err,rows)=>{
//     //                 connection.release();
//     //                 if(!err){
//     //                     res.send({success: true});
//     //                 }
//     //                 else
//     //                     console.log(err)
//     //             })

//     //         })
//     // //     }
//     // // })
// };
// exports.getPaymentgatewaysettingNew = (req, res) => {
//     // pool.getConnection((err, connection) => {
//     //     if (err) throw err;
//     //     connection.query('SELECT * FROM payment_gateway_settings', (err, rows) => {
//     //         connection.release();
//     //         if (err) throw err;
//     //         categories = rows;
//     //         // fetch(`http://localhost/getpaymentgatewaysetting.php`)
//     //         // .then(response => response.json())
//     //         // .then(categories => {
//     //             return res.render('paymentgatewaysettingNew.html', { title: "Add Category",categories });
//     //         // });
//     //     })
//     // })
// };
// exports.postPaymentgatewaysettingNew = (req, res) => {
//     // // const storage = multer.diskStorage({
//     // //     destination(req, file, cb) {
//     // //       cb(null, `assets/uploads/categories`);
//     // //     },
//     // //     filename(req, file, cb) {
//     // //         cb(null, file.originalname);
//     // //     },
//     // //   });

//     // // const upload = multer({ storage : storage}).any();
//     // // upload(req,res,async function(err) {
//     // //     if(err) throw err;
//     // //     else {
//     //         console.log(req.query)
//     //         pool.getConnection((err, connection) => {
//     //             if(err) throw err;
//     //             pool.query('INSERT INTO payment_gateway_settings (gateway_provider, gateway_business_account_user_id, gateway_business_account_password, gateway_business_account_marchand_id, gateway_business_account_sandbox_id, gateway_publishable_key, gateway_secret_key) VALUES (?, ?, ?, ?, ?, ?, ?)',
//     //             [req.body.gateway_provider,req.body.gateway_business_account_user_id,req.body.gateway_business_account_password,req.body.gateway_business_account_marchand_id,req.body.gateway_business_account_sandbox_id,req.body.gateway_publishable_key,req.body.gateway_secret_key],(err,rows)=>{
//     //                 connection.release();
//     //                 if(!err){
//     //                     res.send({success: true});
//     //                 }
//     //                 else
//     //                     console.log(err)
//     //             })

//     //         })
//     //     // }
//     // // })
// };
// exports.getPaymentgatewaysettingSection = (req, res) => {
//     // return res.render('paymentgatewaysettingSection.html', { title: "Payment Gateway Settings" });
// };
