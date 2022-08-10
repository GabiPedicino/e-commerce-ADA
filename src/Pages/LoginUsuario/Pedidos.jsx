import { useContext } from 'react'
import CartContext from '../../Context/CartContext'
import { Box, Button, Container, Flex, Text } from "@chakra-ui/react"
import Producto from '../../Layout/Navbar/Producto'

const Pedidos = () => {

  const { cart } = useContext(CartContext)

  const hoy= new Date()
  const anio = hoy.getFullYear()
  const mes= hoy.getMonth() + 1
  const dia= hoy.getDate()

  return (
    <>
    <Container maxW="container.xl" mt="5">
            <Text
                fontSize={'35px'}
                fontWeight={'bold'}
                pt={'30px'}
                pb={'10px'}
              >
                Mis Pedidos
            </Text>  
            <Box w={'20%'} bg={'gray.200'}>
                <Text 
                fontSize={'20px'}
                fontWeight={'bold'}
                marginLeft={'20px'}
                pb={'10px'}
                pt={'10px'}
                >
                  Pedido #
                </Text>
                <Text 
                marginLeft={'20px'}
                fontWeight={'bold'}
                fontSize={'14px'}
                >
                  Productos
                </Text>
                  {!!cart.length && (
                    <Box>
                      {cart.map((producto, index) => (
                          <Text
                            marginLeft={'20px'}
                            fontSize={'14px'}
                          >
                          {`${index +1}`}. {producto.attributes.title}
                          </Text>
                      ))}
                    </Box>
                  )}
             
                <Text 
                fontSize={'16px'}
                fontWeight={'bold'}
                marginLeft={'20px'}
                pb={'10px'}
                pt={'10px'}
                >
                  Fecha de compra: {`${dia}/${mes}/${anio}`}
                </Text>
            </Box>        
    </Container>
    </>
  )
}
export default Pedidos
