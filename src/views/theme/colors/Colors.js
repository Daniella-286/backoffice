import React, { useState } from 'react'
import { CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react'
import { CCard, CCardHeader, CCardBody, CButton } from '@coreui/react'
import { DocsLink } from 'src/components' // Make sure this path is correct

const Color = () => {
  console.log('Composant chargé')
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    console.log('Ouverture')
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          Voici les listes des Annonces que vous disposez
          <DocsLink href="https://coreui.io/docs/content/Color/" />
        </CCardHeader>
        <CCardBody>
          <table className="table">
            <thead>
              <tr>
                <th>Nom_Voiture</th>
                <th>Details</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>
                    <img src="/src/image1.jpg" alt="Image Voiture" />
                  </p>
                </td>
                <td>
                  <span className="highlighter-rouge">h1. Bootstrap heading</span>
                </td>
                <td>
                  <CButton color="primary" className="mr-2" onClick={openModal}>
                    Modifier
                  </CButton>
                </td>
                <td>
                  <CButton color="danger">Suprimer</CButton>
                </td>
              </tr>
            </tbody>
          </table>
        </CCardBody>
      </CCard>
      <CModal show={isModalOpen} onClose={closeModal}>
        <CModalHeader closeButton>o</CModalHeader>
        <CModalBody>
          <form>
            <div>
              <label htmlFor="input1">Input 1:</label>
              <input type="text" id="input1" name="input1" />
            </div>
          </form>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={closeModal}>
            Enregistrer
          </CButton>
          <CButton color="secondary" onClick={closeModal}>
            Annuler
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Color
