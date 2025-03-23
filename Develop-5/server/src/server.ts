import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import db from './config/connection.js';
import routes from './routes/index.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './schemas/index.js';
import cors from 'cors';
import { resolvers } from './schemas/index.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Enable CORS for frontend requests
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend
  credentials: true, // Allow cookies & auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow custom headers
}));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const startApolloServer = async () => {
  await server.start();
  app.use(
    '/graphql',
    express.json(),
    cors({
      origin: 'http://localhost:3000', // Ensure frontend is allowed
      credentials: true, // Allow cookies & auth headers
    }),
    expressMiddleware(server as any)
  );
};

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', async () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
startApolloServer();
