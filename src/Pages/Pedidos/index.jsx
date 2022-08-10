import { useContext } from 'react'
import CartContext from '../../Context/CartContext'
import { Box, Button, Container, Flex, Text } from "@chakra-ui/react"
import Producto from '../../Layout/Navbar/Producto'
import { Link } from 'react-router-dom'


const PedidosCarrito =()=>{
    const { cart, calcularTotal } = useContext(CartContext)
    const total = calcularTotal()

    return (
        <>
        <Container maxW="container.xl" mt="5">
            <Text
                fontSize={'35px'}
                fontWeight={'bold'}
                pb={'30px'}
                pt={'30px'}
              >
                Finalizar compra
            </Text>
            <Flex>
                <Box w='50%'>
                    <Box>
                        <Box>
                            {!!cart.length || (
                                <Box>
                                    <Text> No hay productos en el carrito ☹️</Text>
                                </Box>
                            )}
                
                            {!!cart.length && (
                                <Box>
                                    {cart.map((producto) => (
                                    <Producto
                                        producto={producto}
                                        key={`cartProduct${producto.id}`}
                                    />
                                    ))}
                                </Box>
                            )}
                        </Box>
                    </Box>    
                </Box>
                <Box w='50%'>
                    <Box bg='gray.300'>
                        <Text fontSize={'30px'} pb={'30px'} pt={'20px'} marginLeft={'20px'}>
                        Pedido
                        </Text>
                        <Flex flexDir={'column'} justifyContent={'space-between'} marginLeft={'20px'} marginRight={'20px'} pb={'30px'} pt={'20px'}>
                            <Flex justifyContent={'space-between'} >
                                <Text>Envio</Text>                          
                                <Text>Por el momento no hacemos envios ☹️</Text>  
                            </Flex>
                            <Flex justifyContent={'space-between'} pb={'30px'} pt={'20px'}>
                                <Text>Total</Text>
                                <Text fontWeight={'bold'}>{`$ ${total}`}</Text>
                            </Flex>
                            <Link to='/pedidos'>
                            <Button >Finalizar Compra</Button>
                            </Link>
                        </Flex>

                    </Box>
                </Box>
            </Flex>

        </Container>
        </>
    )
}

export default PedidosCarrito