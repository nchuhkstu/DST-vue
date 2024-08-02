import { request } from "../utils/request";
//专门放服务器接口
export function start(formData){
    return request({
        url:'/processData/polishText',
        method: 'post',
        data:formData
    })
}