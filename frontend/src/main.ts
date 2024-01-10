import { createApp } from 'vue'
import { createRouter, createWebHistory, Router } from "vue-router"
import { createHead } from '@unhead/vue'
import { User } from './types'
import axios from 'axios'
import App from './App.vue'
import Home from './pages/Home.vue'
import CreatePost from './pages/CreatePost.vue'
import NotFound from './pages/NotFound.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Profile from './pages/Profile.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/style.scss'

const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home},
        { path: '/createpost', component: CreatePost, meta: { requireLogin: true }},
        { path: '/login', component: Login},
        { path: '/register', component: Register, meta: { requireLogout: true }},
        { path: '/profile', component: Profile, meta: { requireLogin: true }},
        { path: '/:pathMatch(.*)*', component: NotFound},
    ]
})

router.beforeEach(async (to) => {
    const res = await axios.get('/api/auth/profile')
    const user = res.data as User | null

    if (to.meta.requireLogin && !user) {
        return { path: '/login'}
    }
    if (to.meta.requireLogout && user) {
        return { path: '/'}
    }
})


const head = createHead();

createApp(App)
    .use(router)
    .use(head)
    .mount('#app')
