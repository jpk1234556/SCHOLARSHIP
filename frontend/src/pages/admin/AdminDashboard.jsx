import React, { useEffect, useState } from 'react'
import { SimpleGrid, Box, Heading, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import api from '../../services/api.js'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

export default function AdminDashboard() {
  const [summary, setSummary] = useState({ users: 0, students: 0, sponsors: 0, guardians: 0 })
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    async function load() {
      const [users, students, sponsors, guardians] = await Promise.all([
        api.get('/users'), api.get('/students'), api.get('/sponsors'), api.get('/guardians')
      ])
      setSummary({ users: users.data.length, students: students.data.length, sponsors: sponsors.data.length, guardians: guardians.data.length })
      const data = [
        { name: 'Users', value: users.data.length },
        { name: 'Students', value: students.data.length },
        { name: 'Sponsors', value: sponsors.data.length },
        { name: 'Guardians', value: guardians.data.length }
      ]
      setChartData(data)
    }
    load()
  }, [])

  return (
    <Box>
      <Heading mb={4}>Admin Dashboard</Heading>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
        {Object.entries(summary).map(([k, v]) => (
          <Stat key={k} p={4} shadow="sm" borderWidth="1px" borderRadius="md">
            <StatLabel textTransform="capitalize">{k}</StatLabel>
            <StatNumber>{v}</StatNumber>
          </Stat>
        ))}
      </SimpleGrid>
      <Box h={300} mt={8}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3182CE" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  )
}
