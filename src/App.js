import './App.css';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Fragment } from 'react';
import Layout from './components/Layout/Layout';
import Organizations from './pages/Organizations';
import Traffics from './pages/Traffics';
import AddMasterAdmin from './pages/AddMasterAdmin';
import AddOrganization from './pages/AddOrganization';

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/rasheed" element={<Login />} />
        <Route path="/rasheed/organizations" element={<Layout />}>
          <Route index element={<Organizations />} />
          <Route path="/rasheed/organizations/traffics" element={<Traffics />} />
          <Route path="/rasheed/organizations/addmasteradmin" element={<AddMasterAdmin />} />
          <Route path="/rasheed/organizations/addorganization" element={<AddOrganization />} />
        </Route>
      </Routes>
      <Toaster />
    </Fragment>
  );
}

export default App;
