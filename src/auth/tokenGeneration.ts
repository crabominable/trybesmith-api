import { sign } from 'jsonwebtoken';

const JWT_SECRET = 'meusegredo';

const generateToken = (payload: object) => sign(
  payload,
  JWT_SECRET,
  { expiresIn: '1h', algorithm: 'HS256' },
);

export default generateToken;