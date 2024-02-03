import axios from 'axios';
var sha1 = require('sha1');


const ToggleStatus = async (id, status, parent_id, callback) => {
    let data = {
        "data_array": [{
            status: (status == 1)?0:1
        }],
        "condition_array": [{
            business_id: 1,
            sl_m_category: id
        }],
        "order_array": [{
            business_id: 1,
            parent_id: parent_id,
        }],
    };
    let api_token_id = sha1('CpanelCategory') + '-' + sha1(process.env.REACT_APP_API_URL) + '-' + process.env.REACT_APP_DI + '-' + sha1('m_category') + '-1';
    // let result = 
    axios.post(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_URL}/code_uplers_apis/call_functions.php?api_token_id=${api_token_id}&api_mode=update&api_secret_id=${process.env.REACT_APP_SECRET_KEY}`, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }, data
    }).then(response => {
        // toast.success("Successfully Saved.");
        // return response;
        callback(response);
    }).catch(function (error) {
        // toast.error("Unsuccessful Attempt.");
        // console.log(error);
        return error;
    });
    // return result;
}

export default ToggleStatus;