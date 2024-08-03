import { request } from "../utils/request";
export function get(){
    return request({
        url:'/cluster/get',
        method: 'get'
    })
}
export function add(){
    return request({
        url:'/cluster/add',
        method: 'get'
    })
}
export function Delete(cluster_name){
    return request({
        url:`/cluster/${cluster_name}`,
        method: 'delete'
    })
}