import { defineStore } from 'pinia'
export const useChatStore = defineStore('chat', {
    state: () => ({
        messages:[],
        fixed:true,
    }),
    actions: {
        addOldMessage(data) {
            //从头加
            this.messages.unshift(data);
            var container = document.getElementById('chat-container');
            requestAnimationFrame(()=>{
                if (container && this.fixed == true) {
                    container.scrollTop = container.scrollHeight - container.clientHeight;
                }
            })
        },
        addNewMessage(data){
            //从尾加
            this.messages.push(data);
            var container = document.getElementById('chat-container');
            requestAnimationFrame(()=>{
                if (container && this.fixed == true) {
                    container.scrollTop = container.scrollHeight - container.clientHeight;
                }
            })
        }
    },
    getters: {

    }
})