import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import 'dotenv/config'
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { User } from './schemas/User';
import { insertSeedData } from './seed-data';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: add in initial roles here
  }
})

export default withAuth(config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    // Add data seeding here
    async onConnect(keystone) {
      if (process.argv.includes('--seed-data')) {
        await insertSeedData(keystone);
      }
    },
  },
  lists: createSchema({
    // Schema items to be put here
    User,
    Product,
    ProductImage,
  }),
  ui: {
    // Gives you access to keystone backend based on result of the function
    isAccessAllowed: ({ session }) => {
      return !!session?.data;
    },
  },
  session: withItemData(statelessSessions(sessionConfig), {
    // Graphql query
    User: `id name email`
  })
}));