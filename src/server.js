const express = require('express');
const uploads = require('./api/v1/helpers/request._file.js');
// const multer = require('multer');
const app = express();
// const upload = multer({
//   dest: 'uploads/'
// });

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
app.use(uploads); /* TEMPORARY INACTIVE */
/* disable x-powered-by Express Header */
app.set('x-powered-by', false);
/* determine IP address of the client connected */
app.set('trust proxy', true);

app.get('/', (req, res) => {
  res.json({
    status: "OK",
    message: "Hello, this is preferences and posts services"
  })
    .end();
});

app.post('/test', (req, res, next) => {
  console.info(req.file.filename);
  console.info('MIDDLEWARE');
  next()
}, (req, res) => {
  console.info('AFTER PASS THE MIDDLEWARE');
  res.json({
    message: "ok"
  })
});

/**
 * using preferences & posts route.
 */
app.use(preferencesRoute);

app.listen(parseInt(process.env.PORT || 8080), () => {
  console.info('the server is running...');
});