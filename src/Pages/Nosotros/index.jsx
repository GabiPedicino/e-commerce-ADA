import { Box, Button, Container } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Nosotros = () => {
  return (
    <>
    <Container maxW="container.xl" mt="5">
      <img
        src="https://rcsdigital.com.au/wp-content/uploads/2017/12/404-errors.png"
        alt=""
      />
      <Box display="flex" justifyContent="center" p="10">
        <Link to="/">
          <Button colorScheme="blue">Ir a home</Button>
        </Link>
      </Box>
      </Container>
    </>
  )
}

export default Nosotros
