import { createRouter, createWebHistory } from 'vue-router';  
  
const routes = [  
  {  
    path: '/',  
    name: 'Home',  
    component: () => import('../pages/home.vue')  
  },
  {  
    path: '/admin',
    name: 'admin',
    component: () => import('../pages/admin.vue')  
  }
];  
  
// 创建路由实例  
const router = createRouter({  
  history: createWebHistory(),  
  routes: routes  
});  
  
export default router;