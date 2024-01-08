import { createApp } from 'vue'
import { createRouter, createWebHistory, Router } from "vue-router"
import { createHead } from '@unhead/vue'
import App from './App.vue'
import Home from './pages/Home.vue'
import CreatePost from './pages/CreatePost.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/style.scss'

const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Home},
        { path: "/createpost", component: CreatePost}

    ]
})

const head = createHead();

createApp(App)
    .use(router)
    .use(head)
    .mount('#app')
