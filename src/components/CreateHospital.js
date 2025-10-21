import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global'
export default class CreateHospital extends Component {
    urlHospitales = Global.urlHospitales

    cajaidhospital = React.createRef();
    cajanombre = React.createRef();
    cajadireccion = React.createRef();
    cajatelefono = React.createRef();
    cajacamas = React.createRef();

    state = {
        mensaje: ""
    }

    insertarHospital = (event) => {
        event.preventDefault()
        let request = "webresources/hospitales/post";
        //DEBEMOS RESPETAR LOS TIPOS DE DATO DEL JSON
        let idhospital = parseInt(this.cajaidhospital.current.value);
        let camas = parseInt(this.cajacamas.current.value);
        //EL OBJETO JSON DE REACT DEBE RESPETAR MAYUS/MINUS
        //Y EL NOMBRE DE LAS PROPIEDADES IGUAL QUE EL SERVICIO
        let hospital = {
            idhospital: idhospital,
            nombre: this.cajanombre.current.value,
            direccion: this.cajadireccion.current.value,
            telefono: this.cajatelefono.current.value,
            camas: camas
        }

        axios.post(this.urlHospitales+request, hospital).then(response => {
            this.setState({
                mensaje: "Hospital insertado: "+ hospital.nombre
            })
        })

    }

  render() {
    return (
      <div>
        <h1>Crear Hospital</h1>
        <h2>{this.state.mensaje}</h2>
        <div className='container-fluid'>
            <form className="w-50">
            <div className="mb-3">
                <label className="form-label">ID Hospital</label>
                <input type="number" className="form-control" ref={this.cajaidhospital}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" ref={this.cajanombre}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Dirección</label>
                <input type="text" className="form-control" ref={this.cajadireccion}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input type="text" className="form-control" ref={this.cajatelefono}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Número de camas</label>
                <input type="number" className="form-control" ref={this.cajacamas}/>
            </div>
            <button onClick={this.insertarHospital} className="btn btn-primary">Crear hospital</button>
        </form>
        </div>
      </div>
    )
  }
}
