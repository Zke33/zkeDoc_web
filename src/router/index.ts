import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import("@/views/web/index.vue")
        },
        {
            path: '/doc/:id',
            name: 'doc',
            component: () => import("@/views/web/doc.vue")
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import("@/views/admin/admin.vue"),
            children: [
                {
                    path: '',
                    name: 'admin_home',
                    children: [
                        {
                            path: "",
                            name: "home",
                            component: () => import("@/views/admin/home/index.vue")
                        }
                    ]
                },
                {
                    path: 'user_center',
                    name: 'user_center',
                    children: [
                        {
                            path: 'info',
                            name: 'info',
                            component: () => import("@/views/admin/user_center/user_info.vue")
                        },
                        {
                            path: 'coll',
                            name: 'coll',
                            component: () => import("@/views/admin/user_center/user_coll_docs.vue")
                        },
                    ]
                },

                {
                    path: 'auths',
                    name: 'auths',
                    children: [
                        {
                            path: 'users',
                            name: 'users',
                            component: () => import("@/views/admin/role_mgr/user_list.vue")
                        },
                        {
                            path: 'roles',
                            name: 'roles',
                            component: () => import("@/views/admin/role_mgr/role_list.vue")
                        },
                    ]
                },
                {
                    path: 'settings',
                    name: 'settings',
                    children: [
                        {
                            path: 'logs',
                            name: 'logs',
                            component: () => import("@/views/admin/settings_mgr/logs_list.vue")
                        },
                        {
                            path: 'images',
                            name: 'images',
                            component: () => import("@/views/admin/settings_mgr/images_list.vue")
                        },
                        {
                            path: 'sites',
                            name: 'sites',
                            component: () => import("@/views/admin/settings_mgr/sites.vue")
                        }
                    ]
                },

            ]
        }
    ]
})

export default router
