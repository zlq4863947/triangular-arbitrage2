const { NODE_ENV = 'production' } = process.env;

console.log(`-- Webpack <${NODE_ENV}> build --`);

module.exports = {
  target: 'node',
  mode: NODE_ENV,
  externals: [
    // Here are listed all optional dependencies of NestJS,
    // that are not installed and not required by my project
    {
      'fastify-swagger': 'commonjs2 fastify-swagger',
      'aws-sdk': 'commonjs2 aws-sdk',
      '@nestjs/websockets/socket-module': 'commonjs2 @nestjs/websockets/socket-module',
      '@nestjs/microservices/microservices-module': 'commonjs2 @nestjs/microservices/microservices-module',
      log4js: 'commonjs2 log4js',

      // I'll skip pg-native in the production deployement, and use the pure JS implementation
      'pg-native': 'commonjs2 pg-native',
    },
  ],
  optimization: {
    // Minimization doesn't work with @Module annotation
    minimize: true,
  },
};
