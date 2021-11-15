/**
 * @type {import('snowpack').SnowpackConfig}
 */
 const config = {
    mount: {
      public: '/',
      src: '/',
    },
    packageOptions: {
      installTypes: true,
      NODE_ENV: true,
    },
    devOptions: {
      out: 'dist',
      open: 'none',
      bundle: true,
    },
    buildOptions: {
      clean: true,
      out: 'dist',
    },
    plugins: [
      '@snowpack/plugin-typescript',
      '@snowpack/plugin-babel',
      /* mode && */ '@snowpack/plugin-postcss',
      '@snowpack/plugin-sass',
      [
        '@snowpack/plugin-run-script',
        {
          cmd: 'eslint src --ext .js,.jsx,.ts,.tsx',
          // Optional: Use npm package "eslint-watch" to run on every file change
          watch: 'esw -w --clear src --ext .js,.jsx,.ts,.tsx',
        },
      ],
    ],
    optimize: {
      bundle: true,
      minify: true,
      target: 'es2020',
      treeshake: true,
      splitting: true,
    },
    routes: [
      {
        match: 'routes',
        src: '.*',
        dest: '/index.html',
      },
    ],
  };
  
  module.exports = config;