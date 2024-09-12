import { request } from "../utils/request";
export function get_mods(page_size,current_page){
    return request({
        url:`/${page_size}/${current_page}`,
        method: 'get'
    })
}