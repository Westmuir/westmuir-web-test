const jsDir = 'lib';

module.exports = function (eleventyConfig) {
  eleventyConfig
    .addPassthroughCopy('src/images')
    .addPassthroughCopy('src/favicon.ico')
    .addPassthroughCopy('src/PDF Pages')
    .addPassthroughCopy('src/css/*.css')
    .addPassthroughCopy({ [`${jsDir}/`]: 'js/' });

  eleventyConfig.addWatchTarget('./src/css/');

  // Add this for 11ty's --watch flag
  eleventyConfig.addWatchTarget(`./${jsDir}/**/*.js`);

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
