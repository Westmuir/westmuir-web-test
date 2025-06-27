import markdownit from "markdown-it";
import markdownitcontainer from "markdown-it-container";
import markdownitattrs from "markdown-it-attrs";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

function configureMarkdownIt() {
  return markdownit({ html: true })
    .use(markdownitattrs)
    .use(markdownitcontainer, "dynamic", {
      validate: function () {
        return true;
      },
      render: function (tokens, idx) {
        const token = tokens[idx];
        if (token.nesting === 1) {
          return '<div class="' + token.info.trim() + '">';
        } else {
          return "</div>";
        }
      },
    });
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/**/*");

  eleventyConfig.setLibrary("md", configureMarkdownIt());

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes/layouts",
      output: "_site",
    },
    templateFormats: ["md", "njk", "liquid", "html"],
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid",
  };
}
