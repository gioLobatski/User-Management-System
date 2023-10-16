
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: "user-list",
        name: "user-list",
        component: () => import("pages/UserList.vue"),
      },
      {
        path: "add-user",
        name: "add-user",
        component: () => import("pages/AddUsers.vue"),
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
