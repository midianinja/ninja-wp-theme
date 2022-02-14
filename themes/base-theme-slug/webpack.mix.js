const mix = require('laravel-mix');
const fs = require('fs');
const path = require( 'path' );
const defaultConfig = require( './node_modules/@wordpress/scripts/config/webpack.config' );

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

const getDirFiles = function (dir) {
    // get all 'files' in this directory
    // filter directories
    return fs.readdirSync(dir).filter(file => {
        return fs.statSync(`${dir}/${file}`).isFile();
    });
};

const root_dir = './';
const assets_dir = root_dir + '/assets';
const dist_dir = root_dir + '/dist';

// Generate critical CSS
mix.sass(assets_dir + '/scss/critical-app.scss','./css/critical.css');


// Compile all blocks files into individual CSSs
const blocksCSSPath = assets_dir + '/scss/5-blocks/';
getDirFiles(blocksCSSPath).forEach((filepath) => {
    mix.sass(blocksCSSPath + filepath , './css/');
})
// Compile all page files into individual CSSs
const pagesPath = assets_dir + '/scss/6-pages/';
getDirFiles(pagesPath).forEach((filepath) => {
    mix.sass(pagesPath + filepath , './css/');
})

// Compile all optional files into individual CSSs
const optionalPath = assets_dir + '/scss/8-optional/';
getDirFiles(optionalPath).forEach((filepath) => {
    mix.sass(optionalPath + filepath , './css/');
})

// Compile all JS functionalitis into individual files
const functionalitiesPath = assets_dir + '/javascript/functionalities/';
getDirFiles(functionalitiesPath).forEach((filepath) => {
    mix.js(functionalitiesPath + filepath , './js/functionalities');
})


// Compile all blocks into individual files
const blocksPath = assets_dir + '/javascript/blocks/';
mix.react(blocksPath + 'featuredSlider/index.js' , './js/blocks/featured-slider.js');
mix.react(blocksPath + 'embedTemplate/index.js' , './js/blocks/embed-template.js');
mix.react(blocksPath + 'videoGallery/index.js' , './js/blocks/video-gallery.js');

mix.webpackConfig({
	...defaultConfig,
	entry: {
    },
    
    output: {
        chunkFilename: dist_dir + '/[name].js',
        path: path.resolve( __dirname, './dist/' ),
        publicPath: dist_dir,
        filename: '[name].js',
    },

    module: {
		
    },
  
	devtool: "inline-source-map" 
});
