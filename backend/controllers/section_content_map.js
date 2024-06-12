
const {db} = require(process.env.PWD+'/lib/db');

exports.fileUploader = (req, res) => {
  const data = req.query; 
  console.log(req.file); 
  console.log
  req.file.path = `${process.env.DB_PROTOCOL}${process.env.DB_HOST}:${process.env.DB_PORT}/${req.file.path}`;
  return res.json({ data:[req.file] });
}

exports.createContent = (req, res) => {
    const data = req.body.data;
    let params = [];
    let columns = '';
    let values = '';
    let counter = 0;
    for(var k in data) {
      if(counter > 0) {
        columns += ', ';
        values += ', ';
      }
      columns += k;
      values += '?';
      params.push(data[k]);
      counter++;
    }
    const q = "INSERT INTO `section_content_map` ("+columns+") VALUES ("+values+")";
    // console.log(q);
    db.query(q, params, (err, data) => {
    //   console.log(err, data);
      if (err) return res.json({ error: err.sqlMessage });
      else return res.json({ data });
    });
}

exports.getContent = (req, res) => {
  const data = req.body.data;
  let params = [];
  let where = '';
  let counter = 0;
  for(var k in data) {
    if(counter == 0) {
      where += ' WHERE ';
    } else {
      where += ' AND ';
    }
    where += k+' LIKE ? ';
    params.push("%"+data[k]+"%");
    counter++;
  }
  const q = "select * from section_content_map "+where;
  db.query(q, params, (err, data) => {
  //   console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
}


exports.updateContent = (req, res) => {
  const data = req.body.data.data;
  const filter = req.body.data.filter;
  let params = [];
  let set_data = '';
  let where = '';
  let counter = 0;
  for(var k in data) {
    if(counter > 0) {
      set_data += ', ';
    } else {
      set_data += ' SET ';
    }
    set_data += k + ' = ? ';
    params.push(data[k]);
    counter++;
  }
  counter = 0;
  for(var k in filter) {
    if(counter > 0) {
      where += ' AND ';
    } else {
      where += ' WHERE ';
    }
    where += k + ' = ? ';
    params.push(filter[k]);
    counter++;
  }
  const q = "UPDATE `section_content_map` " + set_data + ' ' + where;
  console.log(q, params)
  db.query(q, params, (err, data) => {
  //   console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
}






exports.deleteContent = (req, res) => {
  const filter = req.body.data;
  let params = [];
  let where = '';
  let counter = 0;
  for(var k in filter) {
    if(counter > 0) {
      where += ' AND ';
    } else {
      where += ' WHERE ';
    }
    where += k + ' = ? ';
    params.push(filter[k]);
    counter++;
  }
  const q = "DELETE FROM `section_content_map` " + where + ' LIMIT 1';
  console.log(q, params)
  db.query(q, params, (err, data) => {
  //   console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
}


