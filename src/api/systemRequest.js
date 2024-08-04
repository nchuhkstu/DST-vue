import { request } from "../utils/request";
export function get(){
    return request({
        url:'/system',
        method: 'get'
    })
}
export function post(data){
    return request({
        url:'/system',
        method: 'post',
        data: data
    })
}