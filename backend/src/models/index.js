import { Sequelize, DataTypes } from 'sequelize';
import { sequelize as sequelizeInstance } from '../config/database.js';

export const sequelize = sequelizeInstance;

export const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('ADMIN', 'SPONSOR', 'GUARDIAN'), defaultValue: 'GUARDIAN' }
}, { tableName: 'users', underscored: true });

export const Student = sequelize.define('Student', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  dob: { type: DataTypes.DATEONLY },
  photoUrl: { type: DataTypes.STRING }
}, { tableName: 'students', underscored: true });

export const Guardian = sequelize.define('Guardian', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING }
}, { tableName: 'guardians', underscored: true });

export const Sponsor = sequelize.define('Sponsor', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  company: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING }
}, { tableName: 'sponsors', underscored: true });

export const SponsorStudent = sequelize.define('SponsorStudent', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  contribution: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 }
}, { tableName: 'sponsor_students', underscored: true });

export const EducationRecord = sequelize.define('EducationRecord', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  studentId: { type: DataTypes.UUID, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
  grade: { type: DataTypes.STRING },
  remarks: { type: DataTypes.TEXT }
}, { tableName: 'education_records', underscored: true });

// Associations
Guardian.hasMany(Student, { foreignKey: 'guardian_id' });
Student.belongsTo(Guardian, { foreignKey: 'guardian_id' });

Sponsor.belongsToMany(Student, { through: SponsorStudent, foreignKey: 'sponsor_id' });
Student.belongsToMany(Sponsor, { through: SponsorStudent, foreignKey: 'student_id' });

Student.hasMany(EducationRecord, { foreignKey: 'student_id' });
EducationRecord.belongsTo(Student, { foreignKey: 'student_id' });
