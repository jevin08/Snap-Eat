import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductProvider } from './context/productContext'
import { UserProvider } from './context/userContext'
import {CartProvider} from './context/cartContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <ProductProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductProvider>
  </UserProvider>
)