import { createModel,
  loginModel,
  createProductModel,
  getAllProductsModel,
  createOrderModel,
  getOrderByIdModel } from '../models';

import { User, UserInterface } from '../interfaces/postUserInterfaces';
import { Login, LoginInterface } from '../interfaces/postLoginInterfaces';
import { Product, ProductInterface } from '../interfaces/postProductInterfaces';
import Products from '../interfaces/getProductsInterfaces';
import { Order, OrderInterface } from '../interfaces/postOrderInterfaces';
import TokenDataInterface from '../interfaces/tokenDataInterfaces';
// import OrderById from '../interfaces/getOrderByIdInterfaces';

// REQUISITO 1
const createService = async (user: UserInterface): Promise<User> => {
  const newUser = await createModel(user);

  return newUser;
};
//

// REQUISITO 2
const loginService = async (login: Login): Promise<LoginInterface> => {
  const user = await loginModel(login);
  
  const { password } = login;

  if (user.password !== password) {
    throw new Error('Username or password invalid');
  }

  const resultUser = { id: user.id, username: user.username };

  return resultUser;
};
//

// REQUISITO 3
const createProductService = async (productObj: Product): Promise<ProductInterface> => {
  const newProduct = await createProductModel(productObj);

  return newProduct;
};
//

// REQUISITO 4
const getAllProductsService = async (): Promise<Products[]> => {
  const products = await getAllProductsModel();
  
  return products;
};
//

// REQUISITO 5
const createOrderService = async (
  products: OrderInterface,
  userObj: TokenDataInterface,
): Promise<Order> => {
  const newOrder = await createOrderModel(products, userObj);

  return newOrder;
};
//

// REQUISITO 6
const getOrderByIdService = async (id: number, userObj: TokenDataInterface) => {
  const order = await getOrderByIdModel(id, userObj);

  return order;
};
//

// REQUISITO 7
/* const getAllOrdersService = async (userObj: TokenDataInterface): Promise<OrderById[]> => {
  const orders = await getAllOrdersModel(userObj);

  return orders;
}; */
//

export {
  createService,
  loginService,
  createProductService,
  getAllProductsService,
  createOrderService,
  getOrderByIdService,
};