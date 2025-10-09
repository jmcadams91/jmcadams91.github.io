const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongod;

module.exports = {
  async setup() {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    return { mongod };
  },
  async teardown() {
    await mongoose.disconnect();
    if (mongod) await mongod.stop();
  }
};
