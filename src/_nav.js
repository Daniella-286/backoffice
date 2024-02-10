import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilLogout,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Accueil',
    to: '/Dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: '',
      text: '',
    },
  },
  {
    component: CNavItem,
    name: '',
    to: '',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Gestion',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Categorie',
        to: '/forms/select',
      },
      {
        component: CNavItem,
        name: 'Model',
        to: '/forms/Range',
      },
      {
        component: CNavItem,
        name: 'Marque',
        to: '/forms/Layout',
      },
      {
        component: CNavItem,
        name: 'Comition',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: CNavItem,
    name: '',
    to: '',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Statistique',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Voiture le plus vendu par mois',
        to: '/forms/input-group',
      },
      {
        component: CNavItem,
        name: 'Etat Financiers par mois',
        to: '/Widgets',
      },
      {
        component: CNavItem,
        name: 'Nombre Utilisateur Inscris',
        to: '/forms/Form-control',
      },
      {
        component: CNavItem,
        name: 'Marque le plus vendus',
        to: '/Charts',
      },
    ],
  },
  {
    component: CNavItem,
    name: '',
    to: '',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Liste des Annonces',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '',
    to: '',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Se Deconnecter',
    to: '/theme/typography',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
]
export default _nav
