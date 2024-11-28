import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './state/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactUs from './Routes/ContactUs';
// import Login from './Routes/AboutUs';
import AboutUs from './Routes/AboutUs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/ContactUs' element={<ContactUs/>}/>
          <Route path='/AboutUs' element={<AboutUs/>}/>
          
          {/* nested routes */}
          <Route path='Signup'>
            {/* <Route path='Login' element={<Login/>}/>  */}
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
