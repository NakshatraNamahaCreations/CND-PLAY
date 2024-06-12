const {db} = require(process.env.PWD+'/lib/db');
exports.getTermsConditions = (req, res) => {
    const q = "select * from terms_conditions";
    db.query(q, (err, data) => {
    //   console.log(err, data);
      if (err) return res.json({ error: err.sqlMessage });
      else return res.json({ data });
    });
}