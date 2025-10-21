import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from '../Global'
import axios from 'axios';

export default class Menu extends Component {
    urlHospitales = Global.urlHospitales;

    state = {
        hospitales : []
    }

    loadHospitales = () => {
        let request = "webresources/hospitales"
        axios.get(this.urlHospitales+request).then(response => {
            this.setState({
                hospitales: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadHospitales();
    }

  render() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Servicio Hospitales & Doctores</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/doctores/7">Doctores 7</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/doctores/22">Doctores 22</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" to="/hospitales" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Hospitales
                    </NavLink>
                    <ul className="dropdown-menu">
                        {
                            this.state.hospitales.map((hospital, index) => {
                                return (<li key = {index}><NavLink className="dropdown-item bg-white text-black" to={"/doctores/"+hospital.idhospital}>
                                            Hospital {hospital.nombre}</NavLink>
                                        </li>)
                            })
                        }
                    </ul>
                    
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/createhospital">Crear Hospital</NavLink>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
  }
}
