import { Workbook } from 'exceljs';
import { Student, Guardian, Sponsor } from '../models/index.js';

export const exportExcel = async (_req, res) => {
  const students = await Student.findAll({ include: [Guardian, Sponsor] });
  const wb = new Workbook();
  const ws = wb.addWorksheet('Students');
  ws.addRow(['First Name', 'Last Name', 'Guardian', 'Sponsors']);
  students.forEach(s => {
    const sponsorNames = s.Sponsors?.map(sp => sp.name).join(', ') || '';
    ws.addRow([s.firstName, s.lastName, s.Guardian?.name || '', sponsorNames]);
  });
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=students.xlsx');
  await wb.xlsx.write(res);
  res.end();
};
