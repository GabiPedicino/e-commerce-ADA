import { useContext } from 'react'

import { Box, Container, Text, Heading } from '@chakra-ui/react'

import CartContext from '../../Context/CartContext'

const Datos = () => {
  const { username, email } = useContext(CartContext)
  return (
    <Container maxW="container.xl" mt="5">
      <Box w={'500px'} margin={'0 auto'} bgColor={'gainsboro'} p={'5'}>
        <Heading textAlign={'center'} p={'3'}>
          Mis Datos
        </Heading>
        <Text> Nombre:{username}</Text>
        <Text> Email:{email}</Text>
      </Box>
    </Container>
  )
}

export default Datos
