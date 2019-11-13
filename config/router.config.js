export default [
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      // index
      { path: '/', redirect: '/home' },
      {
        path: '/home',
        name: 'home',
        icon: 'home',
        component: './home/home',
      },
    ],
  },
];
