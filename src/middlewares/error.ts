import { Request, Response, NextFunction } from 'express';

export default (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err.message === 'Username or password invalid') {
    return res.status(401).json({ error: err.message });
  }
  if (err.message === 'Invalid token') {
    return res.status(401).json({ error: err.message });
  }
  if (err.message === 'Order not found') {
    return res.status(404).json({ error: err.message });
  }
  /* if (err.code) {
    enum StatusCodes {
      invalidLogin = 401,
    }
    const status = StatusCodes[err.code];
    
    return res.status(status).json({ message: err.message });
  } */
  console.log(err);
  return res.status(500).json({ error: { code: 'internal', message: 'Internal server error' } });
};