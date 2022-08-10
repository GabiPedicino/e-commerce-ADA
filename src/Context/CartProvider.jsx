import { useState } from 'react'

import CartContext from './CartContext'

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [token, setToken] = useState(window.localStorage.getItem('token'))
  const [username, setUsername] = useState(window.localStorage.getItem('username'))
  const [email, setEmail] = useState(window.localStorage.getItem('email'))

  const login = (userData) => {
    console.log(userData)
    window.localStorage.setItem('token', userData.jwt)
    window.localStorage.setItem('username', userData.user.username)
    window.localStorage.setItem('email', userData.user.email)
    setToken(userData.jwt)
    setUsername(userData.user.username)
    setEmail(userData.user.email)
  }

  const logOut = () => {
    window.localStorage.removeItem('token')
    setToken(null)
  }

  const addProduct = (producto) => {
    const productExiste = cart.some((item) => item.id === producto.id)

    const cantidadProd = { ...producto, cantidad: 1 }

    if (productExiste) {
      setCart(
        cart.map((unidadProd) => {
          if (unidadProd.id === producto.id) {
            return { ...unidadProd, cantidad: unidadProd.cantidad + 1 }
          }
          return unidadProd
        })
      )
    } else {
      setCart([...cart, cantidadProd])
    }
  }

  const deleteProduct = (id) => {
    const carritoFiltrado = cart.filter((item) => id !== item.id)

    setCart(carritoFiltrado)
  }

  const vaciarCarrito = () => {
    setCart([])
  }

  const calcularTotal = () => {
    console.log(cart)
    return cart.reduce((total, producto) => {
      return total + producto.attributes.price * producto.cantidad
    }, 0)
  }

  const remProduct = (producto) => {
    const carritoCantidad = cart.map((unidadProd) => {
      if (unidadProd.id === producto.id && unidadProd.cantidad > 0) {
        unidadProd.cantidad--
      }
      return unidadProd
    })

    setCart(carritoCantidad)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        deleteProduct,
        vaciarCarrito,
        calcularTotal,
        remProduct,
        token,
        login,
        logOut,
        username,
        email
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
