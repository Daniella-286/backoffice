import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { CChartPie } from '@coreui/react-chartjs'

const Charts = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      },
    ],
  })

  useEffect(() => {
    fetchChartData()
  }, [])

  const fetchChartData = async () => {
    try {
      const response = await axios.get(
        'https://webservice-production-dbfd.up.railway.app/statistiquesannonces',
      )
      const data = response.data

      // Group data by marque and calculate total annonces vendues
      const groupedData = data.reduce((acc, item) => {
        if (!acc[item.nomMarque]) {
          acc[item.nomMarque] = {
            totalAnnoncesVendues: 0,
            color: getRandomColor(), // Get a random color for each marque
          }
        }
        acc[item.nomMarque].totalAnnoncesVendues += item.totalAnnoncesVendues
        return acc
      }, {})

      // Prepare data for chart
      const labels = Object.keys(groupedData)
      const dataValues = Object.values(groupedData).map((item) => item.totalAnnoncesVendues)
      const colors = Object.values(groupedData).map((item) => item.color)

      const chartData = {
        labels: labels,
        datasets: [
          {
            data: dataValues,
            backgroundColor: colors,
            hoverBackgroundColor: colors,
          },
        ],
      }

      setChartData(chartData)
    } catch (error) {
      console.error('Error fetching chart data:', error)
    }
  }

  const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>Marques les plus vendues</CCardHeader>
          <CCardBody>
            <CChartPie style={{ width: '400px', height: '400px' }} data={chartData} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Charts
