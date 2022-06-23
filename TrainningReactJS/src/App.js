import './App.css';
import EmployeeManager from './views/EmployeeManager'
import InforEmployee from './views/InforEmployee'
import Login from './views/Login'
import Informations from './components/Informations';
import Statistics from './components/Statistics';
import Advance from './components/Advance';
import Working from './components/Working';
import Team from './views/Team'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from 'react-router-dom';
//import { ConnectedRouter as Router } from 'connected-react-router';
function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/employee' element={<EmployeeManager />} />
          <Route path='/team' element={<Team />} />
          <Route path='/employee/employee-infor' element={<InforEmployee />}>
            <Route path='/employee/employee-infor/infor' element={<Informations />}></Route>
            <Route path='/employee/employee-infor/working' element={<Working />}></Route>
            <Route path='/employee/employee-infor/advances' element={<Advance />}></Route>
            <Route path='/employee/employee-infor/Statistics' element={<Statistics />}></Route>
          </Route>
          <Route
            path="/"
            element={<Navigate to="/employee" replace />}
          />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
}

export default App;
