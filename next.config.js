const webpack = require('webpack');
const withCSS = require("@zeit/next-css");
const withFonts = require('next-fonts');
const withSass = require('@zeit/next-sass')
const withImages = require('next-images');
const withPurgeCss = require('next-purgecss')
const withPlugins = require("next-compose-plugins");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { TRUE } = require('node-sass');


module.exports = withPlugins(
  [
    withCSS,
    withSass,
    withPurgeCss,
    withFonts,
    withImages
  ],
  
  {
    target: 'serverless', 
    env : {
      USER_POOL_ID: 'us-east-1_cS2g0tYO6',
      CLIENT_ID: '7iucdm7ru8adagdq0oohj4un1h',
      HTTPS: true
    },
  
    webpack: (config, {dev, isServer}) => {
     
      config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
      // Fixes npm packages that depend on `fs` module
      if (isServer) {
        return config;
     }
     
     

     var isProduction = config.mode === 'production';
     if (!isProduction) {
        return config;
     }
     config.plugins.push(
        new webpack.optimize.LimitChunkCountPlugin({
           maxChunks: 1,
        })
     );

     config.optimization.minimizer.push(
        new OptimizeCSSAssetsPlugin({})
     );
      config.node = {
        fs: 'empty'
      }
      return config
    }
  })