import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, Heading, Input, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import api from '../../services/api.js'

export default function StudentsPage() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [form, setForm] = useState({ firstName: '', lastName: '' })

  async function load() {
    const res = await api.get('/students')
    setItems(res.data)
  }
  useEffect(() => { load() }, [])

  async function onCreate() {
    await api.post('/students', form)
    setForm({ firstName: '', lastName: '' })
    load()
  }

  async function onDelete(id) {
    await api.delete(`/students/${id}`)
    load()
  }

  const filtered = useMemo(() => items.filter(s =>
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(q.toLowerCase())
  ), [items, q])

  return (
    <Box>
      <Heading mb={4}>Students</Heading>
      <Box display="flex" gap={2} mb={3}>
        <Input placeholder="Search" value={q} onChange={e => setQ(e.target.value)} />
      </Box>
      <Box display="flex" gap={2} mb={4}>
        <Input placeholder="First name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
        <Input placeholder="Last name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
        <Button colorScheme="blue" onClick={onCreate}>Add</Button>
      </Box>
      <Table>
        <Thead><Tr><Th>First</Th><Th>Last</Th><Th></Th></Tr></Thead>
        <Tbody>
          {filtered.map(s => (
            <Tr key={s.id}>
              <Td>{s.firstName}</Td>
              <Td>{s.lastName}</Td>
              <Td><Button size="sm" colorScheme="red" onClick={() => onDelete(s.id)}>Delete</Button></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
