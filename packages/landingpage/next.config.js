require('dotenv').config()

module.exports = {
  experimental: {
    externalDir: true
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }

    config.node = {
      fs: "empty", // webpack4 era solution
    };

    return config
  },
}
