import { EducationRecord } from '../models/index.js';

export const list = async (_req, res) => {
  const items = await EducationRecord.findAll();
  res.json(items);
};

export const get = async (req, res) => {
  const item = await EducationRecord.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

export const create = async (req, res) => {
  const item = await EducationRecord.create(req.body);
  res.status(201).json(item);
};

export const update = async (req, res) => {
  const item = await EducationRecord.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  await item.update(req.body);
  res.json(item);
};

export const remove = async (req, res) => {
  const item = await EducationRecord.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  await item.destroy();
  res.status(204).send();
};
