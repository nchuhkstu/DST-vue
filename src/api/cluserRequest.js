import { request } from "../utils/request";
//专门放存档接口
export function polish(formData){
    return request({
        url:'/processData/polishText',
        method: 'post',
        data:formData
    })
}