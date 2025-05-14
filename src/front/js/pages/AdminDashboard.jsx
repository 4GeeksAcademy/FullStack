import React from "react";
import { Admin, Resource, CustomRoutes } from "react-admin";
import Dashboard from '../pages/Dashboard.jsx'
import { Route } from "react-router-dom";

// Asegurate que esta ruta es correcta respecto a donde esté AdminDashboard.jsx
import dataProvider from "../dp/dataProvider";

// Importación de componentes desde carpeta 'component'
import UserList from "../component/UserList.jsx";
import UserEdit from "../component/UserEdit.jsx";
import UserShow from "../component/UserShow.jsx";
import CreateUser from "../component/CreateUser.jsx";

import OfertEdit from "../component/OfertEdit.jsx";
import OfertShow from "../component/OfertShow.jsx";
import OfertList from "../component/OfertList.jsx";
import OfertCreate from "../component/OfertCreate.jsx";

import ViajeList from "../component/ViajeList.jsx";
import ViajeShow from "../component/ViajeShow.jsx";
import ViajeEdit from "../component/ViajeEdit.jsx";
import ViajeCreate from "../component/ViajeCreate.jsx";

import TopList from "../component/TopList.jsx";
import TopShow from "../component/TopShow.jsx";
import TopEdit from "../component/TopEdit.jsx";
import TopCreate from "../component/TopCreate.jsx";

import BellezaList from "../component/BellezaList.jsx";
import BellezaShow from "../component/BellezaShow.jsx";
import BellezaEdit from "../component/BellezaEdit.jsx";
import BellezaCreate from "../component/BellezaCreate.jsx";

import GastronomiaList from "../component/GastronomiaList.jsx";
import GastronomiaShow from "../component/GastronomiaShow.jsx";
import GastronomiaEdit from "../component/GastronomiaEdit.jsx";
import GastronomiaCreate from "../component/GastronomiaCreate.jsx";

const AdminDashboard = () => {
  return (
    <Admin basename="/admin" dataProvider={dataProvider} dashboard={Dashboard}>
       <CustomRoutes>
        {/* Esta ruta personalizada redirige a Dashboard cuando se accede a '/admin' */}
        <Route path="/dashboard" element={<Dashboard />} />
      </CustomRoutes>

      <Resource name="users" list={UserList} show={UserShow} edit={UserEdit} create={CreateUser} />
      <Resource name="oferta" list={OfertList} show={OfertShow} edit={OfertEdit} create={OfertCreate}/>
      <Resource name="viajes" list={ViajeList} show={ViajeShow} edit={ViajeEdit} create={ViajeCreate}/>
      <Resource name="tops" list={TopList} show={TopShow} edit={TopEdit} create={TopCreate}/>
      <Resource name="bellezas" list={BellezaList} show={BellezaShow} edit={BellezaEdit} create={BellezaCreate}/>
      <Resource name="gastronomias" list={GastronomiaList} show={GastronomiaShow} edit={GastronomiaEdit} create={GastronomiaCreate}/>
    </Admin>
  )
};

export default AdminDashboard;
