import { createWebHistory,createRouter } from "vue-router"
import Home from "./components/Home.vue"
import UserFrom from "./components/UserForm.vue"

const routes = [
    {
        name: "Home",
        path: "/",
        component: Home
    },
    {
        name: "UserForm",
        path: "/add-user",
        component: UserFrom
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;