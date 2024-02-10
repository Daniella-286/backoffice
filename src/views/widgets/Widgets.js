import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CCard } from '@coreui/react'

const Widgets = () => {
  const [commissionData, setCommissionData] = useState([])

  useEffect(() => {
    fetchCommissionData()
  }, [])

  const fetchCommissionData = async () => {
    try {
      const response = await axios.get(
        'https://webservice-production-dbfd.up.railway.app/commissions/monthly-report',
      )
      const data = response.data
      setCommissionData(data)
    } catch (error) {
      console.error('Error fetching commission data:', error)
    }
  }

  return (
    <>
      <h1
        style={{
          marginBottom: '20px',
          color: '#333',
          textAlign: 'center',
          textDecoration: 'underline',
        }}
      >
        Etat Financiers par Mois
      </h1>
      <CCard className="mb-4">
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ background: '#f4f4f4', color: '#333' }}>Mois</th>
                <th style={{ background: '#f4f4f4', color: '#333' }}>Année</th>
                <th style={{ background: '#f4f4f4', color: '#333' }}>Montant de commission</th>
              </tr>
            </thead>
            <tbody>
              {commissionData.map((item, index) => (
                <tr key={index}>
                  <td>{item.month}</td>
                  <td>{item.year}</td>
                  <td>{item.commissionAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CCard>
    </>
  )
}

export default Widgets
