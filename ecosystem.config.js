module.exports = {
  apps: [
    {
      name: "SkyStats-Production",
      script: "./start/production_start.js",
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: "4G",
      env: {
        NODE_ENV: "production",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "SkyStats-Development",
      script: "./start/development_start.js",
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: "4G",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "development",
      },
    },
  ],
};
