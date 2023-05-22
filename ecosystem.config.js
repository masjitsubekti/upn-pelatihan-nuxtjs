module.exports = {
  apps: [
    {
      name: 'pos-fe',
      exec_mode: 'cluster',
      instances: '2', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
    },
  ],
}
