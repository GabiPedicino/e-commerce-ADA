import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Flex,
  useColorMode,
  useColorModeValue,
  Text
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import Forms from '../../Components/Forms/index'
import Carrito from './Carrito'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      <Container maxW="container.xl" mt="5">
        <Box bg={useColorModeValue('none')} px={4}>
          <Flex
            h={16}
            m={'2'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Link to="/">
              <Text fontSize={'30px'} fontWeight={'bold'}>
                AdaShop
              </Text>
            </Link>
            <Box w={'40%'} display={'flex'} justifyContent={'space-between'}>
              <Link to="/tienda">
                <Text fontSize={'18px'} mt={'1'}>
                  Tienda
                </Text>
              </Link>
              <Link to="/nosotros">
                <Text fontSize={'18px'} mt={'1'}>
                  Nosotros
                </Text>
              </Link>
              <Text fontSize={'18px'} mt={'1'}>
                |
              </Text>
              <Button onClick={toggleColorMode} bg={useColorModeValue('none')}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Carrito />
              <Forms />
            </Box>
          </Flex>
        </Box>
        <Box bg={'black'} borderBottom={'1px'}>
          {' '}
        </Box>
      </Container>
    </>
  )
}

export default Navbar
