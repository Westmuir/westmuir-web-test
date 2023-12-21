module.exports = function (eleventyConfig) {
  eleventyConfig
    .addPassthroughCopy('src/images')
    .addPassthroughCopy('src/favicon.ico')
    .addPassthroughCopy('src/PDF Pages')
    .addPassthroughCopy('src/css/*.css');

  eleventyConfig.addWatchTarget('./src/css/');

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
