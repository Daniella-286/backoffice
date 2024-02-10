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

const Select = () => {
  const [categories, setCategories] = useState([])
  const [newCategoryName, setNewCategoryName] = useState('')
  const [editCategoryId, setEditCategoryId] = useState(null)
  const [editCategoryName, setEditCategoryName] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://webservice-production-dbfd.up.railway.app/categories')
      setCategories(response.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const addCategory = async () => {
    try {
      await axios.post('https://webservice-production-dbfd.up.railway.app/categories', {
        categorieName: newCategoryName,
      })
      setNewCategoryName('')
      fetchCategories()
    } catch (error) {
      console.error('Error adding category:', error)
    }
  }

  const deleteCategory = async (id) => {
    try {
      await axios.delete('https://webservice-production-dbfd.up.railway.app/categories/${id}')
      fetchCategories()
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }

  const editCategory = async (id, newName) => {
    try {
      await axios.put('https://webservice-production-dbfd.up.railway.app/categories/${id}', {
        categorieName: newName,
      })
      fetchCategories()
    } catch (error) {
      console.error('Error editing category:', error)
    }
  }

  const handleEditCategory = async (id, currentName) => {
    setEditCategoryId(id)
    setEditCategoryName(currentName)
  }

  const handleSaveEdit = async () => {
    try {
      await axios.put('https://webservice-production-dbfd.up.railway.app/categories/${editCategoryId}',
        {
          categorieName: editCategoryName,
        },
      )
      fetchCategories()
      setEditCategoryId(null)
      setEditCategoryName('')
    } catch (error) {
      console.error('Error editing category:', error)
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
                    <h1>Categorie</h1>
                    <p className="text-medium-emphasis">Veuillez ajouter votre categorie</p>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        placeholder="categorie"
                        autoComplete="username"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="row">
                      <div className="col-xs-6">
                        <button
                          style={{ backgroundColor: '#3c4b64' }}
                          className="btn mr-2"
                          onClick={addCategory}
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
                    <th>Nom_Categorie</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.categorieName}</td>
                      <td>
                        <button
                          style={{ backgroundColor: '#3c4b64' }}
                          className="btn mr-2"
                          onClick={() => handleEditCategory(category.id, category.categorieName)}
                        >
                          Modifier
                        </button>
                      </td>
                      <td>
                        <button
                          style={{ backgroundColor: '#e55353' }}
                          className="btn mr-2"
                          onClick={() => deleteCategory(category.id)}
                        >
                          Suprimer
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
      {editCategoryId !== null && (
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
              <h2 style={{ marginBottom: '20px' }}>Modifier le nom de la catégorie</h2>
              <input
                type="text"
                placeholder="Nouveau nom de catégorie"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
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
                onClick={() => setEditCategoryId(null)}
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

export default Select
