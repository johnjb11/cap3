import { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap';
import AppNavbar from './components/AppNavbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Products from './pages/Products';
import ProductView from './pages/ProductView'
import Error from './pages/Error';
import Home from './pages/Home';
import Register from './pages/Register';
import AdminOrderView from './pages/AdminOrderView'
import Admin from './pages/Admin'
import Login from './pages/Login';
import Logout from './pages/Logout';
import Checkout from './pages/Checkout';
import OrderView from './pages/OrderView';
import './App.css';
import { UserProvider } from './UserContext';

function App() {

   const [user, setUser] = useState({
      id: null,
      isAdmin: null
  })


  const unsetUser = () => {
    localStorage.clear();
  }


  useEffect( () => {
    let token = localStorage.getItem('token');
    fetch('http://localhost:4000/users/details', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)

      if(typeof data._id !== "undefined"){
        setUser({
          id:data._id,
          isAdmin: data.isAdmin
        })
      } else {
        setUser({
          id: null,
          isAdmin: null
        })
      }
    })
  }, [])




  
  return (
    <UserProvider value={{user, setUser, unsetUser}} >
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/logout" element={<Logout/>} />
            <Route exact path="/myOrder" element={<OrderView/>}/>
            <Route path="/*" element={<Error/>} />
            <Route path = "/AdminOrderView" element={<AdminOrderView/>}/>
            <Route path = "/Admin" element={<Admin/>}/>
            <Route exact path="/products" element={<Products/>} />
            <Route exact path="/products/:productId" element ={<ProductView/>}/>
            <Route exact path = "/checkout" element= {<Checkout/>}/>


          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;


/*
  
  ReactJS is a single page application(SPA). However, we can simulate the changing of pages. We don't actually create new pages, what we just do is switch pages according to their assigned routes. ReactJS and react-router-dom package just mimics or mirrors how HTML access its URL.


  react-router-dom 3 main components to simulate the changing of page

  1. Router - wrapping the router component around other components will allow us to use routing within our page.
  2. Switch - Allow us to switch/ change our page components
  3. Route - assigns a path which will trigger the change/switch of components render.

*/
