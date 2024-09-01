import { request } from "../utils/request";
export function get(cluster_name){
    return request({
        url:`/world/${cluster_name}`,
        method: 'get'
    })
}
export function post(cluster_name,data){
    return request({
        url:`/world/${cluster_name}`,
        method: 'post',
        data: data
    })
}