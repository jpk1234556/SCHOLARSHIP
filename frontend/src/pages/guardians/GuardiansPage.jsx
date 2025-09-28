import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, Heading, Input, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import api from '../../services/api.js'

export default function GuardiansPage() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', email: '' })

  async function load() {
    const res = await api.get('/guardians')
    setItems(res.data)
  }
  useEffect(() => { load() }, [])

  async function onCreate() {
    await api.post('/guardians', form)
    setForm({ name: '', phone: '', email: '' })
    load()
  }

  async function onDelete(id) {
    await api.delete(`/guardians/${id}`)
    load()
  }

  const filtered = useMemo(() => items.filter(g =>
    `${g.name} ${g.email}`.toLowerCase().includes(q.toLowerCase())
  ), [items, q])

  return (
    <Box>
      <Heading mb={4}>Guardians</Heading>
      <Box display="flex" gap={2} mb={3}>
        <Input placeholder="Search" value={q} onChange={e => setQ(e.target.value)} />
      </Box>
      <Box display="flex" gap={2} mb={4}>
        <Input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <Input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <Input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <Button colorScheme="blue" onClick={onCreate}>Add</Button>
      </Box>
      <Table>
        <Thead><Tr><Th>Name</Th><Th>Phone</Th><Th>Email</Th><Th></Th></Tr></Thead>
        <Tbody>
          {filtered.map(g => (
            <Tr key={g.id}>
              <Td>{g.name}</Td>
              <Td>{g.phone}</Td>
              <Td>{g.email}</Td>
              <Td><Button size="sm" colorScheme="red" onClick={() => onDelete(g.id)}>Delete</Button></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
