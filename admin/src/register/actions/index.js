import {
    MAKE_REGISTER,
} from "./type";
import RegisterPageService from "../service/registerpage.service";

export const makeRegister = (data) => async (dispatch) => {
    try {
        const res = await RegisterPageService.makeRegister(data);

        dispatch({
            type: MAKE_REGISTER,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};