import { createApp } from 'vue'
import { createRouter, createWebHistory, Router } from "vue-router"
import App from './App.vue'
import Home from './pages/Home.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/style.scss'

const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Home}
    ]
})

createApp(App)
    .use(router)
    .mount('#app')
