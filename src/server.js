const express = require('express');
const uploads = require('./api/v1/helpers/request._file.js');

/* base app */
const app = express();
/* all route here */
const preferencesRoute = require('./api/v1/routes/_route.v1.js');

/* content-type application/json */
app.use(express.json());
/* make url caseSensitive and Strict */
app.use(express.Router({
  caseSensitive: true,
  strict: true
}));
/* content-type x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true }));
/* content-type multipart/form-data */
app.use(uploads);
/* disable x-powered-by Express Header */
app.set('x-powered-by', false);
/* determine IP address of the client connected */
app.set('trust proxy', true);

app.get('/', (req, res) => {
  res.json({
    status: "OK",
    currentDir: __dirname,
    message: "Hello, this is preferences and posts services",
    version: 'production-0.0.1beta'
  })
    .end();
});
/**
 * using preferences & posts route.
 */
app.use(preferencesRoute);

app.listen(parseInt(process.env.PORT || 8080), () => {
  console.info('the server is running...');
});