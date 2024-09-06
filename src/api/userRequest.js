import { request } from "../utils/request";
export function getUsers(cluster_name){
    return request({
        url:`/user/${cluster_name}`,
        method: 'get'
    })
}
export function setAdmin(cluster_name,userid){
    return request({
        url:`/user/set_admin/${cluster_name}/${userid}`,
        method: 'get'
    })
}
export function deleteAdmin(cluster_name,userid){
    return request({
        url:`/user/delete_admin/${cluster_name}/${userid}`,
        method: 'get'
    })
}
export function kick(cluster_name,userid){
    return request({
        url:`/user/kick/${cluster_name}/${userid}`,
        method: 'get'
    })
}