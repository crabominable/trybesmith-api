import { RequestHandler } from 'express';
import rescue from 'express-rescue';

import { createService,
  loginService,
  createProductService,
  getAllProductsService,
  createOrderService,
  getOrderByIdService } from '../services';

import TokenDataInterface from '../interfaces/tokenDataInterfaces';

import generateToken from '../auth/tokenGeneration';

// REQUISITO 1
const create: RequestHandler = rescue(async (req, res) => {
  const user = req.body;

  const newUser = await createService(user);

  const payload: TokenDataInterface = {
    id: newUser.id,
    userName: newUser.username,
  };
  
  const token = generateToken(payload);
  
  return res.status(201).json({ token });
});
//

// REQUISITO 2
const login: RequestHandler = rescue(async (req, res) => {
  const newLogin = req.body;

  const user = await loginService(newLogin);

  const token = generateToken(user);

  return res.status(200).json({ token });
});
//

// REQUISITO 3
const createProduct: RequestHandler = rescue(async (req, res) => {
  const productObj = req.body;

  const item = await createProductService(productObj);

  const finalProduct = { item };
  
  return res.status(201).json(finalProduct);
});
//

// REQUISITO 4
const getAllProducts: RequestHandler = rescue(async (req, res) => {
  const products = await getAllProductsService();
  
  return res.status(200).json(products);
});
//

// REQUISITO 5
const createOrder: RequestHandler = rescue(async (req, res) => {
  const { products } = req.body;

  const userObj = req.user;

  const order = await createOrderService(products, userObj);

  const finalOrder = { order };
  
  return res.status(201).json(finalOrder);
});
//

// REQUISITO 6
const getOrderById: RequestHandler = rescue(async (req, res) => {
  const { id } = req.params;

  const userObj = req.user;

  const order = await getOrderByIdService(id, userObj);
  // console.log(order);
  return res.status(200).json(order);
});
//

// REQUISITO 7
/* const getAllOrders: RequestHandler = rescue(async (req, res) => {
  const userObj = req.user;

  const orders = await getAllOrdersService(userObj);
  // console.log(order);
  return res.status(200).json(orders);
}); */
//

export {
  create,
  login,
  createProduct,
  getAllProducts,
  createOrder,
  getOrderById,
};