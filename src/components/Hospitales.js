import React, { Component } from "react";
import Global from "../Global";
import axios from "axios";
export default class Hospitales extends Component {
  urlHospitales = Global.urlHospitales;

  state = {
    hospitales: [],
  };

  loadHospitales = () => {
    let request = "webresources/hospitales";
    axios.get(this.urlHospitales + request).then((response) => {
      this.setState({
        hospitales: response.data,
      });
    });
  };

  componentDidMount = () => {
    this.loadHospitales();
  };

  render() {
    return (
      <div className="container">
        <h1 className="my-2">Hospitales</h1>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID Hospital</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Dirección</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Camas</th>
                  <th scope="col" className="text-end"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.hospitales.map((hospital, index) => {
                  return (
                    <tr key={index}>
                      <td>{hospital.idhospital}</td>
                      <td>{hospital.nombre}</td>
                      <td>{hospital.direccion}</td>
                      <td>{hospital.telefono}</td>
                      <td>{hospital.camas}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                        >
                          Detalles
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    );
  }
}
