module.exports = {
    apps: [{
      name: 'tugo',
      script: 'node',
      args: ['build/server_secure.js'],
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }],
  }
