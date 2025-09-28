import { User } from '../models/index.js';
import bcrypt from 'bcrypt';

export const list = async (_req, res) => {
  const users = await User.findAll({ attributes: ['id','name','email','role','createdAt','updatedAt'] });
  res.json(users);
};

export const get = async (req, res) => {
  const user = await User.findByPk(req.params.id, { attributes: ['id','name','email','role'] });
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
};

export const create = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role });
  res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
};

export const update = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  const { name, email, password, role } = req.body;
  if (password) user.password = await bcrypt.hash(password, 10);
  if (name) user.name = name;
  if (email) user.email = email;
  if (role) user.role = role;
  await user.save();
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
};

export const remove = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  await user.destroy();
  res.status(204).send();
};
