import { request } from "../utils/request";
export function getUsers(cluster_name){
    return request({
        url:`/user/${cluster_name}`,
        method: 'get'
    })
}