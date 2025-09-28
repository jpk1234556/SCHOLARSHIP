module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      role: { type: Sequelize.ENUM('ADMIN','SPONSOR','GUARDIAN'), allowNull: false, defaultValue: 'GUARDIAN' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.createTable('guardians', {
      id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      phone: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.createTable('students', {
      id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
      first_name: { type: Sequelize.STRING, allowNull: false },
      last_name: { type: Sequelize.STRING, allowNull: false },
      dob: { type: Sequelize.DATEONLY },
      photo_url: { type: Sequelize.STRING },
      guardian_id: { type: Sequelize.UUID, references: { model: 'guardians', key: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.createTable('sponsors', {
      id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      company: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.createTable('sponsor_students', {
      id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
      sponsor_id: { type: Sequelize.UUID, references: { model: 'sponsors', key: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
      student_id: { type: Sequelize.UUID, references: { model: 'students', key: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
      contribution: { type: Sequelize.DECIMAL(10,2), defaultValue: 0 },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.createTable('education_records', {
      id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
      student_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'students', key: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
      year: { type: Sequelize.INTEGER, allowNull: false },
      grade: { type: Sequelize.STRING },
      remarks: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('education_records');
    await queryInterface.dropTable('sponsor_students');
    await queryInterface.dropTable('sponsors');
    await queryInterface.dropTable('students');
    await queryInterface.dropTable('guardians');
    await queryInterface.dropTable('users');
  }
}
