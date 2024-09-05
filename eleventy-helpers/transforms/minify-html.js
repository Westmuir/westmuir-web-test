import htmlMinifier from 'html-minifier';

/**
 * Minifies HTML in production mode.
 */
export function minifyHTML(eleventyConfig, isDev) {
  // minify the html in Prod mode
  eleventyConfig.addTransform('htmlMinify', function (content, outputPath) {
    if (isDev || !outputPath.endsWith('.html')) {
      return content;
    }
    const minified = htmlMinifier.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
    });
    return minified;
  });
}
