import express from 'express';

import { validateUsername,
  validateClasse,
  validateLevel,
  validatePassword } from './middlewares/postUserValidation';

import { validateName,
  validateAmount } from './middlewares/postProductValidation';

import validateProducts from './middlewares/postOrderValidation';

import validateToken from './auth/tokenValidation';

import errorMiddleware from './middlewares/error';

import { create,
  login,
  createProduct,
  getAllProducts,
  createOrder,
  getOrderById } from './controllers';

const app = express();

app.use(express.json());

// REQUISITO 1
app.post(
  '/users', 
  validateUsername,
  validateClasse,
  validateLevel,
  validatePassword,
  create,
);
//

// REQUISITO 2
app.post(
  '/login',
  validateUsername,
  validatePassword,
  login,
);
//

// REQUISITO 3
app.post(
  '/products',
  validateName,
  validateAmount,
  validateToken,
  createProduct,
);
//

// REQUISITO 4
app.get(
  '/products',
  validateToken,
  getAllProducts,
);
//

// REQUISITO 5
app.post(
  '/orders',
  validateToken,
  validateProducts,
  createOrder,
);
//

// REQUISITO 6
app.get(
  '/orders/:id',
  validateToken,
  getOrderById,
);
//

// REQUISITO 7
/* app.get(
  '/orders',
  validateToken,
  getAllOrders,
); */
//

// INSTÂNCIA DO MIDDLEWARE DE ERRO
// const inError: ErrorRequestHandler = errorMiddleware;
//

// MIDDLEWARE DE ERRO
app.use(errorMiddleware);
//

export default app;
