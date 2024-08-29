import esbuild from 'esbuild';
import tinyGlob from 'tiny-glob';

// dev mode build
const DEV = process.env.NODE_ENV === 'DEV';
const jsFolder = DEV ? 'lib' : 'build';

// can use glob syntax. this will create a bundle for those specific files.
// you want to add SSR'd files here so that you can hydrate them later with
// <lit-island import="js/components/element-definition.js"></lit-island>
const tsEntrypoints = [
  // // entrypoints for hydrating lit-islands
  './src/hydration-entrypoints/**/*.js',
  // // also include a bundle for each individual page
  './src/pages/*.js',
  // // SSR stuff
  './src/ssr-utils/lit-hydrate-support.ts',
  './src/ssr-utils/is-land.ts',
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

// development build
if (DEV) {
  componentsBuild = esbuild
    .build({
      ...config,
      entryPoints,
    })
    .catch(() => process.exit(1));

  // production build
} else {
  // config must be same for SSR and client builds to prevent hydration template
  // mismatches because we minify the templates in prod
  config = {
    bundle: true,
    outdir: jsFolder,
    minify: true,
    format: 'esm',
    treeShaking: true,
    legalComments: 'external',
    plugins: [
      minifyHTMLLiteralsPlugin(),
      gzipPlugin({
        gzip: true,
      }),
    ],
    write: false,
    splitting: true,
  };

  componentsBuild = esbuild
    .build({
      ...config,
      entryPoints,
    })
    .catch(() => process.exit(1));
}

// seperate build so that the SSR bundle doesn't affect bundling for the frontend
const ssrBuild = esbuild
  .build({
    ...config,
    format: 'iife',
    splitting: false,
    treeShaking: false,
    platform: 'node',
    entryPoints: ['src/ssr.js'],
  })
  .catch(() => process.exit(1));

// this code is inlined into the HTML because it is performance-sensitive
const inlineBuild = esbuild
  .build({
    ...config,
    format: 'iife',
    splitting: false,
    entryPoints: ['src/ssr-utils/dsd-polyfill.js'],
  })
  .catch(() => process.exit(1));

await Promise.all([componentsBuild, ssrBuild, inlineBuild]);

process.exit(0);
