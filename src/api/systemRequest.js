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
export function getSystemInfo(){
    return request({
        url:'/system/information',
        method: 'get'
    })
}

export function downloadingSteamCMD(){
    return request({
        url:'/system/downloading_steamCMD',
        method: 'get'
    })
}