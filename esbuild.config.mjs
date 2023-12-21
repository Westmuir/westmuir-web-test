import esbuild from 'esbuild';
import tinyGlob from 'tiny-glob';
const jsFolder = 'lib';

// can use glob syntax. this will create a bundle for those specific files.
// you want to add SSR'd files here so that you can hydrate them later with
// <lit-island import="js/components/element-definition.js"></lit-island>
const tsEntrypoints = [
  // // entrypoints for hydrating lit-islands
  // './src/hydration-entrypoints/**/*.ts',
  // // also include a bundle for each individual page
  // './src/pages/*.ts',
  // // SSR stuff
  // './src/ssr-utils/lit-hydrate-support.ts',
  './stuff/ssr-utils/lit-island.js',
  './stuff/*.js',
];
const filesPromises = tsEntrypoints.map(async entry => tinyGlob(entry));
const entryPoints = (await Promise.all(filesPromises)).flat();

// Shared esbuild config values
let config = {
  bundle: true,
  outdir: jsFolder,
  minify: false,
  format: 'esm',
  treeShaking: true,
  write: true,
  sourcemap: true,
  splitting: true,
};

let componentsBuild = Promise.resolve();

componentsBuild = esbuild
  .build({
    ...config,
    entryPoints,
  })
  .catch(() => process.exit(1));

// Glob of files that will be inlined on the page in <script> tags
const tsInlineEntrypoints = [
  './stuff/ssr-utils/dsd-polyfill.js',
  // // Anything in this directory will be inlined
  // './src/inline/*.ts',
];
const inlineFilesPromises = tsInlineEntrypoints.map(async entry =>
  tinyGlob(entry),
);
const inlineEntryPoints = (await Promise.all(inlineFilesPromises)).flat();

// this code is inlined into the HTML because it is performance-sensitive
const inlineBuild = esbuild
  .build({
    ...config,
    format: 'iife',
    splitting: false,
    entryPoints: inlineEntryPoints,
    outbase: 'stuff',
  })
  .catch(() => process.exit(1));

await Promise.all([componentsBuild, inlineBuild]);

process.exit(0);
