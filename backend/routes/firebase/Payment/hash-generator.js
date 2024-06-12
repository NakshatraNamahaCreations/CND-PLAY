const jsSHA = require('jssha');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
console.log(process.env.KEY,"process.env.KEY")
router.post('/', urlencodedParser, async (req, res) => {
  try {
    if (!req.body.txnid || !req.body.amount || !req.body.productinfo || !req.body.firstname || !req.body.email) {
      return res.send('Mandatory fields missing');
    }

    const pd = req.body;
    const hashString = `${process.env.KEY}|${pd.txnid}|${pd.amount}|${pd.productinfo}|${pd.firstname}|${pd.email}|||||||||||${process.env.SALT}`;
    const sha = new jsSHA('SHA-512', 'TEXT');
    sha.update(hashString);
    const hash = sha.getHash('HEX');
    res.send({ hash });
  } catch (err) {
    console.log('Error generating hash:', err);
    res.status(500).send('Error generating hash');
  }
});

module.exports = router;
