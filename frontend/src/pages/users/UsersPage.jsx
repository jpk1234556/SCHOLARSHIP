import React, { useEffect, useState } from 'react'
import { Box, Button, Heading, Input, Select, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import api from '../../services/api.js'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'GUARDIAN' })

  async function load() {
    const res = await api.get('/users')
    setUsers(res.data)
  }
  useEffect(() => { load() }, [])

  async function onCreate() {
    await api.post('/users', form)
    setForm({ name: '', email: '', password: '', role: 'GUARDIAN' })
    load()
  }

  async function onDelete(id) {
    await api.delete(`/users/${id}`)
    load()
  }

  return (
    <Box>
      <Heading mb={4}>Users</Heading>
      <Box display="flex" gap={2} mb={4}>
        <Input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <Input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <Input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <Select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="ADMIN">ADMIN</option>
          <option value="SPONSOR">SPONSOR</option>
          <option value="GUARDIAN">GUARDIAN</option>
        </Select>
        <Button onClick={onCreate} colorScheme="blue">Create</Button>
      </Box>
      <Table>
        <Thead><Tr><Th>Name</Th><Th>Email</Th><Th>Role</Th><Th></Th></Tr></Thead>
        <Tbody>
          {users.map(u => (
            <Tr key={u.id}><Td>{u.name}</Td><Td>{u.email}</Td><Td>{u.role}</Td><Td><Button size="sm" colorScheme="red" onClick={() => onDelete(u.id)}>Delete</Button></Td></Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
