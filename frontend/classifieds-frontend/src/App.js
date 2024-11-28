import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Ads from './Components/AdsCard';
import NewPost from './Components/NewPost';
import ContactUs from './Routes/ContactUs';
import Discovery from './Components/Discovery';
import { useSelector, useDispatch } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/home',
      element: <App/>
    },
    {
      path: '/contactus',
      element: <ContactUs/>
    }
  ]);

  const postst = useSelector((state)=>state.postst);
  // const dispatch = useDispatch();

  return (
    <div className="App">
      {/* <RouterProvider router = {router}/>  */}
      <header>
        <Navbar/>
      </header>
      <body className="backg">
      <span style={{display: 'flex'}}>
        {console.log({postst})}
        {postst==="off" && <Discovery/>}
        {postst==="on" && <NewPost/>}
      </span>
      </body>
      {/* </RouterProvider> */}
    </div>
  );
}

export default App;
