import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, Heading, Input, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import api from '../../services/api.js'

export default function SponsorsPage() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [form, setForm] = useState({ name: '', company: '', email: '' })

  async function load() {
    const res = await api.get('/sponsors')
    setItems(res.data)
  }
  useEffect(() => { load() }, [])

  async function onCreate() {
    await api.post('/sponsors', form)
    setForm({ name: '', company: '', email: '' })
    load()
  }

  async function onDelete(id) {
    await api.delete(`/sponsors/${id}`)
    load()
  }

  const filtered = useMemo(() => items.filter(s =>
    `${s.name} ${s.company} ${s.email}`.toLowerCase().includes(q.toLowerCase())
  ), [items, q])

  return (
    <Box>
      <Heading mb={4}>Sponsors</Heading>
      <Box display="flex" gap={2} mb={3}>
        <Input placeholder="Search" value={q} onChange={e => setQ(e.target.value)} />
      </Box>
      <Box display="flex" gap={2} mb={4}>
        <Input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <Input placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
        <Input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <Button colorScheme="blue" onClick={onCreate}>Add</Button>
      </Box>
      <Table>
        <Thead><Tr><Th>Name</Th><Th>Company</Th><Th>Email</Th><Th></Th></Tr></Thead>
        <Tbody>
          {filtered.map(s => (
            <Tr key={s.id}>
              <Td>{s.name}</Td>
              <Td>{s.company}</Td>
              <Td>{s.email}</Td>
              <Td><Button size="sm" colorScheme="red" onClick={() => onDelete(s.id)}>Delete</Button></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
