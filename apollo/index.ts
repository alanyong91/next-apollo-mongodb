import dotenvExpand from 'dotenv-expand'

import { ApolloServer } from 'apollo-server-micro';
import mongoose from 'mongoose';
import { makeExecutableSchema } from '@graphql-tools/schema';

import typeDefs from './schemas';
import resolvers from './resolvers';

dotenvExpand(require('dotenv').config())

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

let db: any;

const apolloServer = new ApolloServer({
  schema,
  context: async () => {
    if (!db) {
      try {
        db = await mongoose.connect(process.env.MONGODB_CONNECTION!, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useFindAndModify: false,
          useCreateIndex: true
        });
        console.log('mongodb is connected');
      } catch (e) {
        console.log('error while connecting with graphql context (db)', e);
      }
    }

    return { db };
  }
});

export default apolloServer