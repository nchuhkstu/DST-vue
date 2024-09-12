import { request } from "../utils/request";
export function get_mods(page_size,current_page){
    return request({
        url:`/mod/${page_size}/${current_page}`,
        method: 'get'
    })
}
export function get(){
    return request({
        url:'/mod',
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