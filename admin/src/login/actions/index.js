import {
    MAKE_LOGIN,
} from "./type";
import LoginPageService from "../service/loginpage.service";

export const makeLogin = (data) => async (dispatch) => {
    try {
        const res = await LoginPageService.makeLogin(data);
// console.log(res.data)
        dispatch({
            type: MAKE_LOGIN,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};