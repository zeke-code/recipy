import { createApp } from 'vue'
import { createRouter, createWebHistory, Router } from "vue-router"
import { createHead } from '@unhead/vue'
import App from './App.vue'
import Home from './pages/Home.vue'
import CreatePost from './pages/CreatePost.vue'
import NotFound from './pages/NotFound.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/style.scss'
import Login from './pages/Login.vue'

const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home},
        { path: '/createpost', component: CreatePost},
        { path: '/login', component: Login},
        { path: '/:pathMatch(.*)*', component: NotFound},

    ]
})

const head = createHead();

createApp(App)
    .use(router)
    .use(head)
    .mount('#app')
