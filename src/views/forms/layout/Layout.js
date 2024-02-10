import React, { useState, useEffect } from 'react'
import axios from 'axios'
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

const MarqueCrud = () => {
  const [marques, setMarques] = useState([])
  const [newMarqueName, setNewMarqueName] = useState('')
  const [editMarqueId, setEditMarqueId] = useState(null)
  const [editMarqueName, setEditMarqueName] = useState('')

  useEffect(() => {
    fetchMarques()
  }, [])

  const fetchMarques = async () => {
    try {
      const response = await axios.get('https://webservice-production-dbfd.up.railway.app/marques')
      setMarques(response.data)
    } catch (error) {
      console.error('Error fetching marques:', error)
    }
  }

  const addMarque = async () => {
    try {
      await axios.post('https://webservice-production-dbfd.up.railway.app/marques', {
        marqueName: newMarqueName,
      })
      setNewMarqueName('')
      fetchMarques()
    } catch (error) {
      console.error('Error adding marque:', error)
    }
  }

  const deleteMarque = async (id) => {
    try {
      await axios.delete('https://webservice-production-dbfd.up.railway.app/marques/${id}')
      fetchMarques()
    } catch (error) {
      console.error('Error deleting marque:', error)
    }
  }

  const editMarque = async (id, newName) => {
    try {
      await axios.put('https://webservice-production-dbfd.up.railway.app/marques/${id}', {
        marqueName: newName,
      })
      fetchMarques()
    } catch (error) {
      console.error('Error editing marque:', error)
    }
  }

  const handleEditMarque = async (id, currentName) => {
    setEditMarqueId(id)
    setEditMarqueName(currentName)
  }

  const handleSaveEdit = async () => {
    try {
      await editMarque(editMarqueId, editMarqueName)
      setEditMarqueId(null)
      setEditMarqueName('')
    } catch (error) {
      console.error('Error saving edited marque:', error)
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
                    <h1>Marque</h1>
                    <p className="text-medium-emphasis">Veuillez ajouter votre Marque</p>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        placeholder="Marque"
                        autoComplete="off"
                        value={newMarqueName}
                        onChange={(e) => setNewMarqueName(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="row">
                      <div className="col-xs-6">
                        <button
                          style={{ backgroundColor: '#3c4b64' }}
                          className="btn mr-2"
                          onClick={addMarque}
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
                    <th>Nom de la Marque</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {marques.map((marque) => (
                    <tr key={marque.id}>
                      <td>{marque.marqueName}</td>
                      <td>
                        <button
                          style={{ backgroundColor: '#3c4b64' }}
                          className="btn mr-2"
                          onClick={() => handleEditMarque(marque.id, marque.marqueName)}
                        >
                          Modifier
                        </button>
                      </td>
                      <td>
                        <button
                          style={{ backgroundColor: '#e55353' }}
                          className="btn mr-2"
                          onClick={() => deleteMarque(marque.id)}
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
      {editMarqueId !== null && (
        <div className="modal-overlay">
          <div
            className="modal-content"
            style={{
              boxShadow: 'none',
              position: 'relative',
              top: 'auto',
              left: 'auto',
              transform: 'none',
              width: '50%',
              maxWidth: '600px',
              maxHeight: '80%',
              overflow: 'auto',
              borderRadius: '8px',
              border: '1px solid #ccc',
              background: '#fff',
              padding: '20px',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ marginBottom: '20px' }}>Modifier le nom de la marque</h2>
              <input
                type="text"
                placeholder="Nouveau nom de marque"
                value={editMarqueName}
                onChange={(e) => setEditMarqueName(e.target.value)}
                style={{
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  marginBottom: '10px',
                  width: '100%',
                }}
              />
              <br />
              <br />
              <button
                onClick={handleSaveEdit}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
              >
                Enregistrer
              </button>
              <button
                onClick={() => setEditMarqueId(null)}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MarqueCrud
