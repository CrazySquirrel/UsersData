module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'dist',
  root: 'dist/',
  staticFileGlobs: [
    'dist/index.html',
    'dist/**.*'
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