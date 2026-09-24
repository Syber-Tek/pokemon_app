// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro'); 

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);


module.exports = withUniwindConfig(config, {  
  // relative path to your global.css file
  cssEntryFile: './src/global.css',
  // path where auto-generated typings will be created
  dtsFile: './src/uniwind-types.d.ts'
});
