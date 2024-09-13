import { request } from "../utils/request";
export function get_mods(FormData){
    return request({
        url:'/mod/find',
        method: 'post',
        data:FormData,
        headers: {
            'Accept': 'application/json', // 可以设置其他请求头
            // 不要手动设置 Content-Type，浏览器会自动处理
        },
    })
}
export function get(cluster_name){
    return request({
        url:`/mod/${cluster_name}`,
        method: 'get'
    })
}
export function focus_mod(data){
    return request({
        url:'/mod',
        method: 'post',
        data:data,
    })
}
export function enable_mod(cluster_name,mod_id){
    return request({
        url:`/mod/${cluster_name}/${mod_id}`,
        method: 'get',
    })
}
export function disable_mod(cluster_name,mod_id){
    return request({
        url:`/mod/disable/${cluster_name}/${mod_id}`,
        method: 'get',
    })
}
export function delete_mod(mod_id){
    return request({
        url:`/mod/${mod_id}`,
        method: 'delete',
    })
}