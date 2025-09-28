import React, { useEffect, useState } from 'react'
import { Heading, Box, List, ListItem } from '@chakra-ui/react'
import api from '../../services/api.js'

export default function SponsorDashboard() {
  const [students, setStudents] = useState([])
  useEffect(() => {
    async function load() {
      const res = await api.get('/students')
      setStudents(res.data)
    }
    load()
  }, [])
  return (
    <Box>
      <Heading mb={4}>My Sponsored Students</Heading>
      <List spacing={2}>
        {students.map(s => (
          <ListItem key={s.id}>{s.firstName} {s.lastName}</ListItem>
        ))}
      </List>
    </Box>
  )
}
