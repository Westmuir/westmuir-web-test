module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  // eleventyConfig.addPassthroughCopy("src/**/*.html");
  eleventyConfig.addPassthroughCopy('src/PDF Pages');
  eleventyConfig.addPassthroughCopy('src/css/*.css');

  eleventyConfig.addWatchTarget('./src/css/');

  eleventyConfig.addGlobalData('permalink', () => {
    return data => `${data.page.filePathStem}.${data.page.outputFileExtension}`;
  });

  return {
    templateFormats: ['md', 'html', 'njk'],
    dir: {
      input: 'src',
    },
  };
};
