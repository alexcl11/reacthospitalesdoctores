import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global'
export default class DetallesDoctor extends Component {
    urlDoctores = Global.urlDoctores;
    state = {
        doctor : null
    }

    findDoctor = () => {
        let request = `api/doctores/${this.props.doctorDetalles}`
        axios.get(this.urlDoctores+request).then(response => {
            
            this.setState({
                doctor: response.data
            })
        })
    }

    componentDidMount = () => {        
        this.findDoctor();
    }

    componentDidUpdate = (oldProps) => {
        if(oldProps.doctorDetalles != this.props.doctorDetalles){
            this.findDoctor();
        }
    }

  render() {
    return (
      <div className='my-5'>
        {
            this.state.doctor && 
        (<div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">Dr. {this.state.doctor.apellido}</h5>
                <small>ID: {this.state.doctor.idDoctor}</small>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Especialidad: {this.state.doctor.especialidad}</li>
                <li className="list-group-item">Salario: {this.state.doctor.salario} €</li>
                <li className="list-group-item">ID de hospital: {this.state.doctor.idHospital}</li>
            </ul>
        </div>)}
      </div>
    )
  }
}
