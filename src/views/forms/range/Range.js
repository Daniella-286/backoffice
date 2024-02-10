import React, { useState, useEffect } from 'react'
import axios from 'axios'


const ModelCrud = () => {
  const [models, setModels] = useState([])
  const [newModelName, setNewModelName] = useState('')
  const [editModelId, setEditModelId] = useState(null)
  const [editModelName, setEditModelName] = useState('')

  useEffect(() => {
    fetchModels()
  }, [])

  const fetchModels = async () => {
    try {
      const response = await axios.get('https://webservice-production-dbfd.up.railway.app/models')
      setModels(response.data)
    } catch (error) {
      console.error('Error fetching models:', error)
    }
  }

  const addModel = async () => {
    try {
      await axios.post('https://webservice-production-dbfd.up.railway.app/models', {
        modelName: newModelName,
      })
      setNewModelName('')
      fetchModels()
    } catch (error) {
      console.error('Error adding model:', error)
    }
  }

  const deleteModel = async (id) => {
    try {
      await axios.delete('https://webservice-production-dbfd.up.railway.app/models/${id}')
      fetchModels()
    } catch (error) {
      console.error('Error deleting model:', error)
    }
  }

  const editModel = async (id, newName) => {
    try {
      await axios.put('https://webservice-production-dbfd.up.railway.app/models/${id}', {
        modelName: newName,
      })
      fetchModels()
    } catch (error) {
      console.error('Error editing model:', error)
    }
  }

  const handleEditModel = async (id, currentName) => {
    setEditModelId(id)
    setEditModelName(currentName)
  }

  const handleSaveEdit = async () => {
    try {
      await axios.put('https://webservice-production-dbfd.up.railway.app/models/${editModelId}', {
        modelName: editModelName,
      })
      fetchModels()
      setEditModelId(null)
      setEditModelName('')
    } catch (error) {
      console.error('Error editing model:', error)
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
                    <h1>Modèle</h1>
                    <p className="text-medium-emphasis">Veuillez ajouter votre modèle</p>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        placeholder="Modèle"
                        autoComplete="username"
                        value={newModelName}
                        onChange={(e) => setNewModelName(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="row">
                      <div className="col-xs-6 bat">
                        <button
                          style={{ backgroundColor: '#3c4b64',
                        color : '#ffff' }}
                          className="btn mr-2"
                          onClick={addModel}
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
                    <th>Nom du Modèle</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((model) => (
                    <tr key={model.id}>
                      <td>{model.modelName}</td>
                      <td>
                        <button
                          style={{ backgroundColor: '#3c4b64' }}
                          className="btn mr-2"
                          onClick={() => handleEditModel(model.id, model.modelName)}
                        >
                          Modifier
                        </button>
                      </td>
                      <td>
                        <button
                          style={{ backgroundColor: '#e55353' }}
                          className="btn mr-2"
                          onClick={() => deleteModel(model.id)}
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
      {editModelId !== null && (
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
              <h2 style={{ marginBottom: '20px' }}>Modifier le nom du modèle</h2>
              <input
                type="text"
                placeholder="Nouveau nom du modèle"
                value={editModelName}
                onChange={(e) => setEditModelName(e.target.value)}
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
                onClick={() => setEditModelId(null)}
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

export default ModelCrud
