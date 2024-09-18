import { request } from "../utils/request";
export function getChat(cluster_name,time,page_size,current_page){
    return request({
        url:`/chat/${cluster_name}/${time}/${page_size}/${current_page}`,
        method: 'get'
    })
}