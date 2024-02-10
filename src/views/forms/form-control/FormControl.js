import React, { useState, useEffect } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import axios from 'axios'

const StatsComponent = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Nombre d utilisateurs inscrits',
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
        data: [],
      },
    ],
  })

  useEffect(() => {
    fetchStatsData()
  }, [])

  const fetchStatsData = async () => {
    try {
      const response = await axios.get('https://webservice-production-dbfd.up.railway.app/userstats')
      const data = response.data

      const labels = data.map((entry) => '${entry.monthAbbreviated} ${entry.year}')
      const registrations = data.map((entry) => entry.numberOfRegistrations)

      console.log('Labels:', labels)
      console.log('Registrations:', registrations)

      setChartData({
        ...chartData,
        labels: labels,
        datasets: [
          {
            ...chartData.datasets[0],
            data: registrations,
          },
        ],
      })
    } catch (error) {
      console.error('Error fetching stats data:', error)
    }
  }

  return (
    <>
      <h1>Nombre d utilisateurs inscrits</h1>
      <CCard className="mb-4">
        <CCardBody>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={chartData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default StatsComponent
