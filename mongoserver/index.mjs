//index.js
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import demodata from './data/omm-ws2223.json' assert {type: "json"};

  



// This will create an new instance of "MongoMemoryServer" and automatically start it
const mongod = await MongoMemoryServer.create({instance:{port:65535}});

const uri = mongod.getUri();
console.log(uri)


await mongoose.connect(uri, {});