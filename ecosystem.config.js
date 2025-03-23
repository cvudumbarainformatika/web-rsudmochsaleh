module.exports = {
  apps: [{
    name: 'rsud-mochsaleh',
    script: 'index.js',
    instances: 1, // Gunakan single instance
    exec_mode: 'cluster',
    max_memory_restart: '300M', // Restart jika penggunaan memori melebihi 300MB
    node_args: '--max-old-space-size=300', // Batasi heap memory Node.js
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
