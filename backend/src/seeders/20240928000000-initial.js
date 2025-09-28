const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const password = await bcrypt.hash('admin123', 10);
    await queryInterface.bulkInsert('users', [{
      id: uuidv4(),
      name: 'Admin User',
      email: 'admin@example.com',
      password,
      role: 'ADMIN',
      created_at: new Date(),
      updated_at: new Date()
    }]);

    const guardianId = uuidv4();
    const studentId = uuidv4();
    await queryInterface.bulkInsert('guardians', [{
      id: guardianId,
      name: 'Jane Guardian',
      phone: '123456789',
      email: 'jane.guardian@example.com',
      created_at: new Date(),
      updated_at: new Date()
    }]);
    await queryInterface.bulkInsert('students', [{
      id: studentId,
      first_name: 'John',
      last_name: 'Student',
      dob: '2012-01-01',
      photo_url: null,
      guardian_id: guardianId,
      created_at: new Date(),
      updated_at: new Date()
    }]);
    const sponsorId = uuidv4();
    await queryInterface.bulkInsert('sponsors', [{
      id: sponsorId,
      name: 'Good Sponsor',
      company: 'Good Inc',
      email: 'sponsor@example.com',
      created_at: new Date(),
      updated_at: new Date()
    }]);
    await queryInterface.bulkInsert('sponsor_students', [{
      id: uuidv4(), sponsor_id: sponsorId, student_id: studentId, contribution: 500, created_at: new Date(), updated_at: new Date()
    }]);
    await queryInterface.bulkInsert('education_records', [{
      id: uuidv4(), student_id: studentId, year: 2024, grade: 'A', remarks: 'Excellent', created_at: new Date(), updated_at: new Date()
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('education_records', null, {});
    await queryInterface.bulkDelete('sponsor_students', null, {});
    await queryInterface.bulkDelete('sponsors', null, {});
    await queryInterface.bulkDelete('students', null, {});
    await queryInterface.bulkDelete('guardians', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
}
