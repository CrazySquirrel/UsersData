module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'dist',
  root: 'dist/',
  staticFileGlobs: [
    'dist/index.html',
    'dist/**.js',
    'dist/**.css',
    'dist/**.gif',
    'dist/**.png',
    'dist/**.jpg',
    'dist/**.svg',
    'dist/**.ttf',
    'dist/**.otf',
    'dist/**.woff',
    'dist/**.woff2',
    'dist/**.eot'
  ],
  runtimeCaching: [
    {
      urlPattern: /jsonplaceholder\.typicode\.com/,
      handler: 'fastest'
    },
    {
      urlPattern: /placehold\.it/,
      handler: 'fastest'
    }
  ]
};