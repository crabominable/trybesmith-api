import { Request } from 'express';

export default interface TokenDataInterface extends Request {
  user?: object,
}