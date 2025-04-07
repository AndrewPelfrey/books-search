import type { Request } from 'express';

export interface GraphQLContext {
  req: Request;
  user?: {
    _id: unknown;
    username: string;
  };
}
