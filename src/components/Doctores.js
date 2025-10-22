import React, { Component } from "react";
import Global from "../Global";
import axios from "axios";
import DetallesDoctor from "./DetallesDoctor";

export default class Doctores extends Component {
  urlDoctores = Global.urlDoctores;
  urlHospitales = Global.urlHospitales;

  state = {
    doctores: [],
    hospital: "",
    doctorDetalles: null,
  };

  loadDoctores = () => {
    let request = `api/Doctores/DoctoresHospital/${this.props.idhospital}`;
    axios.get(this.urlDoctores + request).then((response) => {
      this.setState({
        doctores: response.data,
      });
    });
  };

  loadNombreHospital = () => {
    let request = `webresources/hospitales/${this.props.idhospital}`;
    axios(this.urlHospitales + request).then((response) => {
      if (response.data) {
        this.setState({
          hospital: response.data.nombre,
        });
      }
    });
  };

  loadDoctorDetalles = (iddoctor) => {
    this.setState({
      doctorDetalles: iddoctor,
    });
  };

  componentDidMount = () => {
    this.loadDoctores();
    this.loadNombreHospital();
    this.setState({
      doctorDetalles: null,
    });
  };

  componentDidUpdate = (oldProps) => {
    if (oldProps.idhospital != this.props.idhospital) {
      this.setState({
        doctorDetalles: null,
        hospital: null,
      });
      this.loadDoctores();
      this.loadNombreHospital();
    }
  };

  render() {
    return (
      <div className="container my-3">
        {this.state.doctorDetalles && (
          <DetallesDoctor doctorDetalles={this.state.doctorDetalles} />
        )}
        <div className="card shadow-sm">
          {this.state.hospital ? (
            <div className="card-header">
              <h5 className="mb-0">
                Doctores del{" "}
                <strong>
                  Hospital {this.state.hospital && this.state.hospital}
                </strong>
              </h5>
            </div>
          ) : (
            <div className="card-header">
              <h5 className="mb-0">No existe este Hospital</h5>
            </div>
          )}
          {this.state.doctores.length > 0 && (
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-striped table-hover mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">ID Doctor</th>
                      <th scope="col">Apellido</th>
                      <th scope="col">Especialidad</th>
                      <th scope="col">Salario</th>
                      <th scope="col" className="text-end"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.doctores.map((doctor, index) => {
                      return (
                        <tr key={index}>
                          <td>{doctor.idDoctor}</td>
                          <td>{doctor.apellido}</td>
                          <td>{doctor.especialidad}</td>
                          <td className="text-end">{doctor.salario} €</td>
                          <td>
                            <button
                              onClick={() => {
                                this.loadDoctorDetalles(doctor.idDoctor);
                              }}
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
          )}
        </div>

        {this.state.doctores.length == 0 && (
          <div className="card shadow-sm">
            <div className="card-body text-center text-muted">
              <p className="mb-0">
                No hay doctores registrados en este hospital.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
