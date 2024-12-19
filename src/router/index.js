import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },
        {
            path: '/contact-and-review',
            name: 'contact-and-review',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../pages/ContactAndReviewPage.vue'),
        },
        {
            path: '/private',
            name: 'private',
            component: () => import('../pages/PrivatePage.vue'),
        },
        {
            path: '/login',
            name : 'login',
            component: () => import('../pages/AuthPage.vue'),
        }
    ],
})

export default router
