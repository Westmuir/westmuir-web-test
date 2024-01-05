const jsDir = 'lib';

const inlineJS = require('./eleventy-helpers/shortcodes/inline-js.cjs');

module.exports = function (eleventyConfig) {
  eleventyConfig
    .addPassthroughCopy('src/images')
    .addPassthroughCopy('src/favicon.ico')
    .addPassthroughCopy('src/PDF Pages')
    .addPassthroughCopy('src/Walk of the Month')
    .addPassthroughCopy('src/videos')
    .addPassthroughCopy('src/css/*.css')
    .addPassthroughCopy({ [`${jsDir}/`]: 'js/' });

  eleventyConfig.addWatchTarget('./src/css/');

  // Add this for 11ty's --watch flag
  eleventyConfig.addWatchTarget(`./${jsDir}/**/*.js`);

  inlineJS(eleventyConfig, true, { jsDir });

  eleventyConfig.addLayoutAlias('default', 'layouts/base.html');

  eleventyConfig.addGlobalData('permalink', () => {
    return data => `${data.page.filePathStem}.${data.page.outputFileExtension}`;
  });

  return {
    templateFormats: ['md', 'html', 'njk'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'src',
    },
  };
};
