module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/images');
  // eleventyConfig.addPassthroughCopy("src/**/*.html");
  eleventyConfig.addPassthroughCopy('src/PDF Pages');

  eleventyConfig.addGlobalData('permalink', () => {
    return data => `${data.page.filePathStem}.${data.page.outputFileExtension}`;
  });

  return {
    templateFormats: ['md', 'html'],
    dir: {
      input: 'src',
    },
  };
};
