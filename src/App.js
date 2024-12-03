import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Layout from './components/Layout/Layout';
import Organizations from './pages/Organizations';
import Traffics from './pages/Traffics';
import AddMasterAdmin from './pages/AddMasterAdmin';
import AddOrganization from './pages/AddOrganization';
import OrgaDetails from './pages/OrgaDetails';
import AddProject from './pages/AddProject';
import ProjectDetails from './pages/ProjectDetails';
import Suggestions from './pages/Suggestions';
import EditOrganization from './pages/EditOrganization';
import Profile from './pages/Profile';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './pages/protectedRoutes/PrivateRoute';
import Problems from './pages/Problems';
import EditProject from './pages/EditProject';
import Comments from './pages/Comments';
import Openions from './pages/Openions';
import OpenionDetails from './pages/OpenionDetails';
import CommentsAct from './pages/CommentsAct';

function App() {
  return (
    <>
      <Routes>
        <Route path="/rasheed" element={<Login />} />
        <Route path="/rasheed/organizations" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute allowedRoles={['Master']}>
                <Organizations />
              </PrivateRoute>
            }
          />
          <Route
            path="traffics"
            element={
              <PrivateRoute allowedRoles={['Master']}>
                <Traffics />
              </PrivateRoute>
            }
          />
          <Route
            path="addmasteradmin"
            element={
              <PrivateRoute allowedRoles={['Master']}>
                <AddMasterAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="suggestions"
            element={
              <PrivateRoute allowedRoles={['Master']}>
                <Suggestions />
              </PrivateRoute>
            }
          />
          <Route
            path="problems"
            element={
              <PrivateRoute allowedRoles={['Master']}>
                <Problems />
              </PrivateRoute>
            }
          />
          <Route
            path="addorganization"
            element={
              <PrivateRoute allowedRoles={['Master']}>
                <AddOrganization />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute allowedRoles={['Master']}>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path=":orgid">
            <Route
              index
              element={
                <PrivateRoute allowedRoles={['OrgAdmin', 'Master']}>
                  <OrgaDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="addproject"
              element={
                <PrivateRoute allowedRoles={['OrgAdmin', 'Master']}>
                  <AddProject />
                </PrivateRoute>
              }
            />
            <Route
              path="editorg"
              element={
                <PrivateRoute allowedRoles={['Master']}>
                  <EditOrganization />
                </PrivateRoute>
              }
            />
            <Route
              path="projectdetails/:projid"
              element={
                <PrivateRoute allowedRoles={['OrgAdmin', 'Master']}>
                  <ProjectDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="projectdetails/:projid/editProject"
              element={
                <PrivateRoute allowedRoles={['OrgAdmin', 'Master']}>
                  <EditProject />
                </PrivateRoute>
              }
            />
              <Route
              path="projectdetails/:projid/suggestions"
              element={
                <PrivateRoute allowedRoles={['OrgAdmin', 'Master']}>
                  <Suggestions />
                </PrivateRoute>
              }
            />
              <Route
              path="projectdetails/:projid/comments"
              element={
                <PrivateRoute allowedRoles={['OrgAdmin', 'Master']}>
                  <Comments />
                </PrivateRoute>
              }
            />
              <Route
              path="projectdetails/:projid/comments/:actid"
              element={
                <PrivateRoute allowedRoles={['OrgAdmin', 'Master']}>
                  <CommentsAct />
                </PrivateRoute>
              }
            />
               <Route
              path="projectdetails/:projid/openions"
              element={
                <PrivateRoute allowedRoles={['Master']}>
                  <Openions />
                </PrivateRoute>
              }
            />
              <Route
              path="projectdetails/:projid/openiondetails/:opid"
              element={
                <PrivateRoute allowedRoles={['Master']}>
                  <OpenionDetails />
                </PrivateRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
