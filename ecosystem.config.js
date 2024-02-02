module.exports = {
  apps: [
    {
      name: 'painel',
      exec_mode: 'cluster',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
