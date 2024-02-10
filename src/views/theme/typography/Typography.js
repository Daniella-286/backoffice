import React, { useEffect, useState } from 'react'
import { CCard, CCardHeader, CCardBody, CButton } from '@coreui/react'
import axios from 'axios'

const AnnoncesList = () => {
  const [annonces, setAnnonces] = useState([])

  useEffect(() => {
    fetchAnnonces()
  }, [])

  const fetchAnnonces = async () => {
    try {
      const response = await axios.get('http://webservice-production-dbfd.up.railway.app/commissions/annoncesDetails')
      setAnnonces(response.data)
    } catch (error) {
      console.error('Error fetching annonces:', error)
    }
  }

  const validerAnnonce = async (idAnnonce) => {
    try {
      await axios.post(`http://webservice-production-dbfd.up.railway.app/commissions/status/valider/${idAnnonce}`)
      const updatedAnnonces = annonces.filter((annonce) => annonce.idAnnonce !== idAnnonce)
      setAnnonces(updatedAnnonces)
    } catch (error) {
      console.error('Error validating annonce:', error)
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Voici les listes des Annonces que vous disposez</CCardHeader>
        <CCardBody>
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Marque</th>
                <th>Catégorie</th>
                <th>Détails</th>
                <th>Prix</th>
                <th>Date Annonce</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {annonces.map((annonce) => (
                <tr key={annonce.idAnnonce}>
                  <td>{annonce.nom}</td>
                  <td>{annonce.nomMarque}</td>
                  <td>{annonce.nomCategorie}</td>
                  <td>{annonce.detail}</td>
                  <td>{annonce.prix}</td>
                  <td>{annonce.dateAnnonce}</td>
                  <td>
                    <CButton
                      color="danger"
                      onClick={() => validerAnnonce(annonce.idAnnonce)}
                      disabled={annonce.valide}
                    >
                      Valider
                    </CButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CCardBody>
      </CCard>
    </>
  )
}

export default AnnoncesList
