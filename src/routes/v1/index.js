const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const subjectRoute = require('./subject.route');
const fileRoute = require('./file.route');
const bankRoute = require('./bank.route');
const topicRoute = require('./topic.route');
const cloudinaryRoute = require('./cloudinary.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/subjects',
    route: subjectRoute,
  },
  {
    path: '/files',
    route: fileRoute,
  },
  {
    path: '/cloudinary',
    route: cloudinaryRoute,
  },
  {
    path: '/topics',
    route: topicRoute,
  },
  {
    path: '/banks',
    route: bankRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
