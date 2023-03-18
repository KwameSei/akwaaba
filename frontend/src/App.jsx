import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ColorModeContext, useMode } from './components/partials/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';


import {NavBar} from './components/partials/Top_navbar';
import {HomePage} from './components/Pages/Home';
import {SignUp} from './components/Pages/Sign-Up-In/SignUp';
import {SignIn} from './components/Pages/Sign-Up-In/SignIn';
import {CreateEvent} from './components/Pages/Events/CreateEvent';
import {CartPage} from './components/Pages/Cart/CartPage';
import {Dashboard} from './components/Pages/Dashboard/Dashboard';
import {Bar} from './components/Pages/Dashboard/Bar/Bar';
import {Contacts} from './components/Pages/Dashboard/Contacts/Contacts';
import {FAQ} from './components/Pages/Dashboard/FAQ/FAQ';
import {Geography} from './components/Pages/Dashboard/Geography/Geography';
import {Invoices} from './components/Pages/Dashboard/Invoices/Invoices';
import {Line} from './components/Pages/Dashboard/Line/Line';
import {Pie} from './components/Pages/Dashboard/Pie/Pie';
import {Calendar} from './components/Pages/Dashboard/Calendar/Calendar';
import { Users } from './components/Pages/Dashboard/users/Users';
import { NotFound } from './components/partials/NotFound';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { loadUser } from './store/authActions';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch]);

const [theme, colorMode] = useMode();
  
  return (
    
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="App">
            <main className="content">
              <Router>
                <ToastContainer />
                <div>
                  <NavBar />
                  <Routes>
                    <Route path='/cart' element={<CartPage />} />
                    <Route path='/create-event-page' element={<CreateEvent />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/sign-in' element={<SignIn />} />
                    {/* Dashboard Pages */}
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/bar' element={<Bar />} />
                    <Route path='/calendar' element={<Calendar />} />
                    <Route path='/contacts' element={<Contacts />} />
                    <Route path='/faq' element={<FAQ />} />
                    <Route path='/geography' element={<Geography />} />
                    <Route path='/invoices' element={<Invoices />} />
                    <Route path='/line' element={<Line />} />
                    <Route path='/pie' element={<Pie />} />
                    <Route path='*' element={<NotFound />} />
                    <Route path='/users' exact element={<Users />} />
                    {/* Dashboard Pages End */}
                    <Route path='/' element={<HomePage />} />
                    <Route path='*' element={<NotFound />} />
                  </Routes>
                </div>
              </Router>
             </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
    
  );
}

export default App;
