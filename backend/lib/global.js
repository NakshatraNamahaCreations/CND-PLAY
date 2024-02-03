// const {db} = require(process.env.PWD+'/db');


const checkDuplicate = (filter, table_name="") => {
    // console.log(filter)
    let params = [];
    let where = '';
    let counter = 0;
    for(var k in filter) {
        if(counter == 0) {
        where += ' WHERE ';
        } else {
        where += ' AND ';
        }
        where += k+' = ? ';
        params.push(filter[k]);
        counter++;
    }
    const sql = "select count(1) AS exist from `"+table_name+"` "+where;
    return {sql: sql, params: params};
}

const createNewRecord = (data, table_name="") => {
    let params = [];
    let columns = '';
    let values = '';
    let counter = 0;
    for(var k in data) {
      if(counter > 0) {
        columns += ', ';
        values += ', ';
      }
      columns += "`"+k+"`";
      values += '?';
      params.push(data[k]);
      counter++;
    }
    const sql = "INSERT INTO `"+table_name+"` ("+columns+") VALUES ("+values+")";
    return {sql: sql, params: params};

}

const fetchData = (filter, table_name="") => {
    let params = [];
    let where = '';
    let counter = 0;
    for(var k in filter) {
        if(counter == 0) {
        where += ' WHERE ';
        } else {
        where += ' AND ';
        }
        where += k+' = ? ';
        params.push(filter[k]);
        counter++;
    }
    const sql = "select * from `"+table_name+"` "+where;
    return {sql: sql, params: params};

}


module.exports = {checkDuplicate, createNewRecord, fetchData};
