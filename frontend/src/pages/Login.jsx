import React, { useState } from 'react'
import { Box, Button, Heading, Input, VStack } from '@chakra-ui/react'
import api from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/login', { email, password })
      login(data)
      navigate('/')
    } catch (e) {
      setError(e.response?.data?.message || 'Login failed')
    }
  }

  return (
    <Box maxW="md" mx="auto" mt="20">
      <Heading mb="6">Login</Heading>
      <form onSubmit={onSubmit}>
        <VStack gap={3}>
          <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <Box color="red.500">{error}</Box>}
          <Button type="submit" colorScheme="blue" w="full">Login</Button>
        </VStack>
      </form>
    </Box>
  )
}
