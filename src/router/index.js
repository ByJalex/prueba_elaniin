import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
        path: "/menu",
        name: "Menu",
        component: () =>
            import ("../views/Menu.vue"),
    },
    {
        path: "/",
        name: "Home",
        component: () =>
            import ("../views/Home.vue"),
    },
    {
        path: "/about",
        name: "about",
        component: () =>
            import ("../views/About.vue"),
    },
    {
        path: "/restaurants",
        name: "restaurants",
        component: () =>
            import ("../views/Restaurants.vue"),
    },
    {
        path: "/contact",
        name: "contact",
        component: () =>
            import ("../views/Contact.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;