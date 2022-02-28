import { ResultSetHeader } from 'mysql2';

import connection from './connection';

import { User, UserInterface } from '../interfaces/postUserInterfaces';
import { Login } from '../interfaces/postLoginInterfaces';
import { Product, ProductInterface } from '../interfaces/postProductInterfaces';
import Products from '../interfaces/getProductsInterfaces';
import { Order, OrderInterface } from '../interfaces/postOrderInterfaces';
import TokenDataInterface from '../interfaces/tokenDataInterfaces';
import OrderById from '../interfaces/getOrderByIdInterfaces';

// REQUISITO 1
const createModel = async (user: UserInterface): Promise<User> => {
  const { username, classe, level, password } = user;

  const [result] = await connection
    .execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
    [username, classe, level, password],
  );
  const { insertId: id } = result;

  const newUser = { id, username, classe, level, password };

  return newUser;
};
//

// REQUISITO 2
const loginModel = async (user: Login): Promise<Login> => {
  const { username } = user;

  const [result] = await connection
    .execute('SELECT * FROM Trybesmith.Users WHERE username = ?', [username]);
  
  const helperUser = result as User[];
  if (helperUser.length === 0) {
    throw new Error('Username or password invalid');
  }
  const [parseResult] = helperUser;
  
  const { id } = parseResult;

  const toUser = { id, username, password: parseResult.password };

  return toUser;
};
//

// REQUISITO 3
const createProductModel = async (productObj: Product): Promise<ProductInterface> => {
  const { name, amount } = productObj;

  const [result] = await connection
    .execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
    [name, amount],
  );
  const { insertId: id } = result;

  const newUser = { id, name, amount };

  return newUser;
};
//

// REQUISITO 4
const getAllProductsModel = async (): Promise<Products[]> => {
  const [parseProducts] = await connection.execute('SELECT * FROM Trybesmith.Products');

  const products = parseProducts as Products[];

  return products;
};
//

// REQUISITO 5
const createOrderModel = async (
  productsReq: OrderInterface,
  userObj: TokenDataInterface,
): Promise<Order> => {
  const { id } = userObj;

  const [newParserOrder] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
    [id],
  );

  const products: number[] = [];

  await Promise.all(productsReq.map(async (i: number) => {
    products.push(i);
    connection.execute(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
      [newParserOrder.insertId, i],
    );
  }, productsReq));

  const order = { userId: id, products };

  return order;
};
//

// REQUISITO 6
const getOrderByIdModel = async (
  orderId: number,
  userObj: TokenDataInterface,
): Promise<OrderById> => {
  const { id } = userObj;

  const [order] = await connection
    .execute('SELECT * FROM Trybesmith.Orders WHERE id = ?', [orderId]);
  
  const parserOrder = order as unknown as OrderById[];

  if (parserOrder.length === 0) {
    throw new Error('Order not found');
  }

  const [parseProducts] = await connection
    .execute('SELECT * FROM Trybesmith.Products WHERE orderId = ?', [id]);

  const parse2Products = parseProducts as Products[];

  const products: number[] = [];
  // console.log(parse2Products);
  parse2Products.map((i) => products.push(i.id));

  const [parserOrder2] = parserOrder;
  
  const finalOrder = { id: parserOrder2.id, userId: id, products };

  return finalOrder;
};
//

// REQUISITO 7
/* const getAllOrdersModel = async (userObj: TokenDataInterface): Promise<OrderById[]> => {
  
}; */
//

export {
  createModel,
  loginModel,
  createProductModel,
  getAllProductsModel,
  createOrderModel,
  getOrderByIdModel,
};