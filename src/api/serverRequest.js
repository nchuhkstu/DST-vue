import { request } from "../utils/request";
export function start(cluster_name){
    return request({
        url:`/server/start/${cluster_name}`,
        method: 'get'
    })
}
export function stop(cluster_name){
    return request({
        url:`/server/stop/${cluster_name}`,
        method: 'get'
    })
}
export function save(cluster_name){
    return request({
        url:`/server/save/${cluster_name}`,
        method: 'get'
    })
}
export function backtrack(cluster_name,days){
    return request({
        url:`/server/start/${cluster_name}/${days}`,
        method: 'get'
    })
}
export function customCommand(cluster_name,command){
    return request({
        url:`/server/custom_command/${cluster_name}/${command}`,
        method: 'get'
    })
}