//index.js
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';




// This will create an new instance of "MongoMemoryServer" and automatically start it
const mongod = await MongoMemoryServer.create({instance:{port:65535}});

const uri = mongod.getUri();
console.log(uri)


await mongoose.connect(uri, {});