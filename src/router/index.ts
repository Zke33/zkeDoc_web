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
            meta: {
                title: "首页",
            },
            children: [
                {
                    path: '',
                    name: 'admin_home',
                    meta: {
                        title: "",
                    },
                    children: [
                        {
                            path: "",
                            name: "home",
                            meta: {
                                title: "",
                            },
                            component: () => import("@/views/admin/home/index.vue")
                        }
                    ]
                },
                {
                    path: 'user_center',
                    name: 'user_center',
                    meta: {
                        title: "个人中心",
                    },
                    children: [
                        {
                            path: 'info',
                            name: 'info',
                            meta: {
                                title: "个人信息",
                            },
                            component: () => import("@/views/admin/user_center/user_info.vue")
                        },
                        {
                            path: 'coll',
                            name: 'coll',
                            meta: {
                                title: "收藏列表",
                            },
                            component: () => import("@/views/admin/user_center/user_coll_docs.vue")
                        },
                    ]
                },
                {
                    path: 'auths',
                    name: 'auths',
                    meta: {
                        title: "权限管理",
                    },
                    children: [
                        {
                            path: 'users',
                            name: 'users',
                            meta: {
                                title: "用户列表",
                            },
                            component: () => import("@/views/admin/role_mgr/user_list.vue")
                        },
                        {
                            path: 'roles',
                            name: 'roles',
                            meta: {
                                title: "角色列表",
                            },
                            component: () => import("@/views/admin/role_mgr/role_list.vue")
                        },
                    ]
                },
                {
                    path: 'settings',
                    name: 'settings',
                    meta: {
                        title: "系统管理",
                    },
                    children: [
                        {
                            path: 'logs',
                            name: 'logs',
                            meta: {
                                title: "日志列表",
                            },
                            component: () => import("@/views/admin/settings_mgr/logs_list.vue")
                        },
                        {
                            path: 'images',
                            name: 'images',
                            meta: {
                                title: "图片列表",
                            },
                            component: () => import("@/views/admin/settings_mgr/images_list.vue")
                        },
                        {
                            path: 'sites',
                            name: 'sites',
                            meta: {
                                title: "站点配置",
                            },
                            component: () => import("@/views/admin/settings_mgr/sites.vue")
                        }
                    ]
                },
            ]
        }
    ]
})

export default router
