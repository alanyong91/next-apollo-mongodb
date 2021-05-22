import dotenvExpand from 'dotenv-expand'
import Cors from 'micro-cors';

import apolloServer from './../../../apollo'

dotenvExpand(require('dotenv').config())

const cors = Cors({
  allowMethods: ['POST', 'OPTIONS']
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default cors(
  apolloServer.createHandler({
    path: '/api/graphql'
  })
);
