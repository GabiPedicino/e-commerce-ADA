import React from "react";

import { Route, Routes } from "react-router-dom";

import CartProvider from "./Context/CartProvider";
import ShopLayout from "./Layout/ShopLayout";
import Descripcion from "./Pages/Descripcion";
import Home from "./Pages/Home";
import Datos from "./Pages/LoginUsuario/Datos";
import Pedidos from "./Pages/LoginUsuario/Pedidos";
import Nosotros from "./Pages/Nosotros";
import PedidosCarrito from "./Pages/Pedidos";
import Tienda from "./Pages/Tienda";

const App = () => {
  return (
    <>
      <CartProvider>
        <ShopLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="tienda/productos/:title" element={<Descripcion />} />
            <Route path="/productos/:title" element={<Descripcion />} />
            <Route path="/datos" element={<Datos />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/carrito" element={<PedidosCarrito />} />
          </Routes>
        </ShopLayout>
      </CartProvider>
    </>
  );
};

export default App;
