export default [
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      // index
      { path: '/',
        name: 'home',
        icon: 'home',
        component: './home/home',
      },
    ],
  },
];
