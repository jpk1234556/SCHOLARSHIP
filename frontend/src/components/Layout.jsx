import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { Box, Flex, Heading, Button } from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <Box>
      <Flex as="nav" gap={4} p={4} bg="gray.100" align="center">
        <Heading size="md">SMS</Heading>
        <Link to="/">Dashboard</Link>
        <Link to="/students">Students</Link>
        <Link to="/sponsors">Sponsors</Link>
        <Link to="/guardians">Guardians</Link>
        <Link to="/users">Users</Link>
        <Link to="/reports">Reports</Link>
        <Flex ml="auto" gap={3} align="center">
          {user ? <>
            <span>{user.name} ({user.role})</span>
            <Button size="sm" onClick={() => { logout(); navigate('/login'); }}>Logout</Button>
          </> : <Link to="/login">Login</Link>}
        </Flex>
      </Flex>
      <Box p={4}>
        <Outlet />
      </Box>
    </Box>
  )
}
