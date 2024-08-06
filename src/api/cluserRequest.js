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
export function getRoom(cluster_name){
    return request({
        url:`/cluster/${cluster_name}`,
        method: 'get'
    })
}
export function setRoom(data){
    return request({
        url:'/cluster/setRoom',
        method: 'post',
        data: data
    })
}
export function Delete(cluster_name){
    return request({
        url:`/cluster/${cluster_name}`,
        method: 'delete'
    })
}