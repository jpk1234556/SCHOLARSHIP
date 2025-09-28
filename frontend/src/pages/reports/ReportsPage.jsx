import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, Heading, Input, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import api from '../../services/api.js'

export default function ReportsPage() {
  const [students, setStudents] = useState([])
  const [q, setQ] = useState('')

  useEffect(() => {
    async function load() {
      const res = await api.get('/students')
      setStudents(res.data)
    }
    load()
  }, [])

  const filtered = useMemo(() => students.filter(s =>
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(q.toLowerCase())
  ), [students, q])

  function exportPDF() {
    const doc = new jsPDF()
    doc.text('Students Report', 14, 16)
    const rows = filtered.map(s => [s.firstName, s.lastName, s.Guardian?.name || '', (s.Sponsors||[]).map(sp => sp.name).join(', ')])
    // @ts-ignore
    doc.autoTable({ head: [['First', 'Last', 'Guardian', 'Sponsors']], body: rows, startY: 22 })
    doc.save('students.pdf')
  }

  async function exportExcel() {
    const res = await api.get('/reports/excel', { responseType: 'blob' })
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'students.xlsx')
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  return (
    <Box>
      <Heading mb={4}>Reports</Heading>
      <Box display="flex" gap={2} mb={3}>
        <Input placeholder="Search students" value={q} onChange={e => setQ(e.target.value)} />
        <Button colorScheme="blue" onClick={exportPDF}>Export PDF</Button>
        <Button onClick={exportExcel}>Export Excel</Button>
      </Box>
      <Table>
        <Thead><Tr><Th>First</Th><Th>Last</Th><Th>Guardian</Th><Th>Sponsors</Th></Tr></Thead>
        <Tbody>
          {filtered.map(s => (
            <Tr key={s.id}>
              <Td>{s.firstName}</Td>
              <Td>{s.lastName}</Td>
              <Td>{s.Guardian?.name}</Td>
              <Td>{(s.Sponsors||[]).map(sp => sp.name).join(', ')}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
