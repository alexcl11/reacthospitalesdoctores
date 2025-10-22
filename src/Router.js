import React, { Component } from 'react'
import { Route, BrowserRouter, Routes, useParams} from 'react-router-dom'
import Home from './components/Home'
import Menu from './components/Menu'
import NotFound from './components/NotFound'
import Doctores from './components/Doctores'
import CreateHospital from './components/CreateHospital'
import Hospitales from './components/Hospitales'

export default class Router extends Component {
  render() {

    function DoctoresElement() {
      let {idhospital} = useParams();
      return (<Doctores idhospital={idhospital}/>)
    }

    return (
      <BrowserRouter>
      <Menu/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/doctores/:idhospital" element={<DoctoresElement/>}/>
            <Route path="/createhospital" element={<CreateHospital/>}/>
            <Route path="/hospitales" element={<Hospitales/>}/>
            <Route path="*" element={<NotFound/>}/>            
        </Routes>
      </BrowserRouter>
    )
  }
}
