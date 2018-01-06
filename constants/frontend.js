const FRONTEND_DEV_URLS = [
  'http://platypost.s3-website-us-west-1.amazonaws.com'
];
//change to http://localhost:3000
const FRONTEND_PROD_URLS = [
  'http://platypost.s3-website-us-west-1.amazonaws.com'
];

module.exports =
  process.env.NODE_ENV === 'production'
    ? FRONTEND_PROD_URLS
    : FRONTEND_DEV_URLS;
