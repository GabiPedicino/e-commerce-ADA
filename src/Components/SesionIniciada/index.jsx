import { useContext } from "react";

import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";

import CartContext from "../../Context/CartContext";

const SesionIniciada = () => {
  const { token, logOut } = useContext(CartContext);
  // const { username, email } = useContext(CartContext);

  return (
    <>
      <Menu>
        {token && <MenuButton as={Button}>{<FaRegUser />}</MenuButton>}
        <MenuList>
          <Link to="/">
            <MenuItem>{}</MenuItem>
          </Link>
          <Link to="/datos">
            <MenuItem>Mis datos</MenuItem>
          </Link>
          <Link to="/pedidos">
            <MenuItem>Mis pedidos</MenuItem>
          </Link>
          <Link to="/">
            <MenuItem onClick={() => logOut()}>Cerrar sesion</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </>
  );
};
export default SesionIniciada;
