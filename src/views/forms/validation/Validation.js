import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CRow,
} from '@coreui/react'
import Modal from 'react-modal'

const CommissionCrud = () => {
  const [commissions, setCommissions] = useState([])
  const [newCommissionName, setNewCommissionName] = useState('')
  const [editCommissionId, setEditCommissionId] = useState(null)
  const [editCommissionName, setEditCommissionName] = useState('')

  useEffect(() => {
    fetchCommissions()
  }, [])

  const fetchCommissions = async () => {
    try {
      const response = await axios.get('https://webservice-production-dbfd.up.railway.app/commissions')
      setCommissions(response.data)
    } catch (error) {
      console.error('Error fetching commissions:', error)
    }
  }

  const addCommission = async () => {
    try {
      await axios.post('https://webservice-production-dbfd.up.railway.app/commissions', {
        marge: newCommissionName,
      })
      setNewCommissionName('')
      fetchCommissions()
    } catch (error) {
      console.error('Error adding commission:', error)
    }
  }

  const deleteCommission = async (id) => {
    try {
      await axios.delete('https://webservice-production-dbfd.up.railway.app/commissions/${id}')
      fetchCommissions()
    } catch (error) {
      console.error('Error deleting commission:', error)
    }
  }

  const handleEditCommission = async (id, currentName) => {
    setEditCommissionId(id)
    setEditCommissionName(currentName)
  }

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        'https://webservice-production-dbfd.up.railway.app/commissions/${editCommissionId}',
        { marge: editCommissionName },
      )
      fetchCommissions()
      setEditCommissionId(null)
      setEditCommissionName('')
    } catch (error) {
      console.error('Error editing commission:', error)
    }
  }

  return (
    <div className="bg-light min-vh-88 d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card-group">
              <div className="card p-4">
                <div className="card-body">
                  <form>
                    <h1>Commission</h1>
                    <p className="text-medium-emphasis">Veuillez ajouter votre Commission</p>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        placeholder="Commission"
                        autoComplete="off"
                        value={newCommissionName}
                        onChange={(e) => setNewCommissionName(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="row">
                      <div className="col-xs-6">
                        <button
                          style={{ backgroundColor: '#3c4b64' }}
                          className="btn mr-2"
                          onClick={addCommission}
                        >
                          Ajouter
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nom de la Commission</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {commissions.map((commission) => (
                    <tr key={commission.id}>
                      <td>{commission.marge}</td>
                      <td>
                        <button
                          style={{ backgroundColor: '#3c4b64' }}
                          className="btn mr-2"
                          onClick={() => handleEditCommission(commission.id, commission.marge)}
                        >
                          Modifier
                        </button>
                      </td>
                      <td>
                        <button
                          style={{ backgroundColor: '#e55353' }}
                          className="btn mr-2"
                          onClick={() => deleteCommission(commission.id)}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommissionCrud
