import { alertsRepo } from '../repositories/alerts.repo.js';
import { usersRepo } from '../repositories/users.repo.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';
import {
  loginSchema,
  registerSchema,
  validateSchema,
} from '../utils/validation.js';

async function getUsers(query) {
  const filter = query ? query : {};
  const result = await usersRepo.getUsers(filter);

  const users = result.map((user) => {
    const { _id, passwordHash, ...rest } = user;
    return { id: _id.toString(), ...rest };
  });
  return users;
}

async function getUserById(userId) {
  const user = await usersRepo.getUserById(userId);
  if (!user) {
    const error = new Error('User not found!');
    error.status = 404;
    throw error;
  }

  const { _id, passwordHash, ...rest } = user;

  return { id: _id.toString(), ...rest };
}

async function getUserByName(userName) {
  const user = await usersRepo.getUserByName(userName);
  if (!user) {
    const error = new Error('User not found!');
    error.status = 404;
    throw error;
  }

  const { _id, ...rest } = user;

  return { id: _id.toString(), ...rest };
}

async function register(userData) {
  validateSchema(registerSchema, userData);

  const userNameExists = await usersRepo.getUserByName(userData.userName);
  if (userNameExists) {
    const error = new Error('Username is taken!');
    error.status = 409;
    throw error;
  }

  const { password, ...restData } = userData;
  const hashedPassword = await bcrypt.hash(password, 12);
  const dataToSave = { ...restData, passwordHash: hashedPassword };

  const cretaed = await usersRepo.saveUser(dataToSave);
  const { _id, passwordHash, ...rest } = cretaed;

  return { ...rest };
}

async function login(userName, password) {
  validateSchema(loginSchema, { userName, password });
  const user = await getUserByName(userName);

  const isAuthenticated = await bcrypt.compare(password, user.passwordHash);

  if (!isAuthenticated) {
    const error = new Error('Incorrect password!');
    error.status = 401;
    throw error;
  }

  const { passwordHash, ...rest } = user;

  const token = generateToken({ userName });
  return { user: rest, token };
}

async function deleteUserById(userId) {
  const user = await getUserById(userId);

  const deleted = await alertsRepo.deleteAlert(userId);
  const { _id, ...rest } = deleted;

  return { id: _id.toString(), ...rest };
}

export const authService = {
  getUsers,
  getUserById,
  getUserByName,
  register,
  login,
  deleteUserById,
};
