const path = require('path')
const { prepareJestConfig } = require('@netcracker/qubership-apihub-jest-chrome-in-docker-environment')

module.exports = prepareJestConfig(
  path.resolve(__dirname, './common-it-test.jest.config.js'),
  path.resolve(__dirname, './common-puppeteer.config.js'),
  {
    // todo: update to use appropriate registry and image version
    // todo: add to package.json dependency on qubership-apihub-jest-chrome-in-docker-environment and import the prepareJestConfig from it  
    // dockerImage: 'ghcr.io/netcracker/qubership-apihub-nodejs-dev-image:feature_publish-in-registry',
    // dockerImage: 'nodejs-dev-img:121',
    dockerImage: 'localhost/nodejs-dev-img:test',
    // dockerBinary: 'podman',
  },
)
