import { AuthenticationError } from '../services/auth.js';
import User from '../models/User.js';  
import { signToken } from '../services/auth.js';
import { Request } from 'express';

const UserModel = User;  

interface JwtPayload {
  _id: string;
  username: string;
  email: string;
}

interface GraphQLContext {
  user?: JwtPayload;
  req: Request;
}

interface UserInterface {
  _id: string;
  username: string;
  email: string;
  savedBooks: BookInput[];
  bookCount: number;
}

interface BookInput {
  bookId: string;
  authors: string[];
  description: string;
  title: string;
  image?: string;
  link?: string;
}

export const resolvers = {
  Query: {
    me: async (_parent: unknown, _args: {}, context: GraphQLContext) => {
      if (context.user) {
        const user: UserInterface | null = await UserModel.findById(context.user._id);
        if (!user) {
          throw new AuthenticationError('Not authenticated');
        }
        return user;
      }
      throw new AuthenticationError('Not authenticated');
    },
  },

  Mutation: {
    login: async (_parent: unknown, { email, password }: { email: string; password: string }) => {
      const user = await UserModel.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    addUser: async (_parent: unknown, { username, email, password }: { username: string; email: string; password: string }) => {
      const user = await UserModel.create({ username, email, password });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    saveBook: async (_parent: unknown, { book }: { book: BookInput }, context: GraphQLContext) => {
      if (!context.user) throw new AuthenticationError('Not authenticated');

      return await UserModel.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedBooks: book } },
        { new: true, runValidators: true }
      );
    },

    removeBook: async (_parent: unknown, { bookId }: { bookId: string }, context: GraphQLContext) => {
      if (!context.user) throw new AuthenticationError('Not authenticated');

      return await UserModel.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
    },
  },
};
