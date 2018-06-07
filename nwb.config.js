module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactMapkit',
      externals: {
        react: 'React',
      },
    },
  },
}
