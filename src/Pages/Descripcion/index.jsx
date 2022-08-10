import { useContext } from 'react'

import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import CartContext from '../../Context/CartContext'
import useGet from '../../Hooks/useGet'

const Descripcion = () => {
  const { data } = useGet('/products?populate[0]=image')
  const { title } = useParams()
  const { addProduct } = useContext(CartContext)

  return (
    <Flex>
      {data &&
        data.data
          .filter((articulo) => articulo.attributes.title === title)
          .map((articulo) => {
            return (
              <Container maxW={'5xl'} key={articulo.id}>
                <SimpleGrid
                  columns={{ base: 1, lg: 2 }}
                  spacing={{ base: 8, md: 10 }}
                  py={{ base: 18, md: 24 }}
                >
                  <Flex>
                    <Image
                      rounded={'md'}
                      alt={'product image'}
                      src={articulo.attributes.image.data.attributes.url}
                      fit={'cover'}
                      align={'center'}
                      w={'100%'}
                      h={{ base: '100%', sm: '400px', lg: '500px' }}
                    />
                  </Flex>
                  <Stack spacing={{ base: 6, md: 10 }}>
                    <Box as={'header'}>
                      <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
                      >
                        {articulo.attributes.title}
                      </Heading>
                      <Text
                        color={useColorModeValue('gray.900', 'gray.400')}
                        fontWeight={300}
                        fontSize={'2xl'}
                      >
                        {'$' + articulo.attributes.price}
                      </Text>
                    </Box>

                    <Stack
                      spacing={{ base: 4, sm: 6 }}
                      direction={'column'}
                      divider={
                        <StackDivider
                          borderColor={useColorModeValue(
                            'gray.200',
                            'gray.600'
                          )}
                        />
                      }
                    >
                      <VStack spacing={{ base: 4, sm: 6 }}>
                        <Text
                          color={useColorModeValue('gray.500', 'gray.400')}
                          fontSize={'2xl'}
                          fontWeight={'300'}
                        >
                          {articulo.attributes.description}
                        </Text>
                      </VStack>
                    </Stack>

                    <Button
                      rounded={'none'}
                      w={'full'}
                      mt={8}
                      size={'lg'}
                      py={'7'}
                      bg={useColorModeValue('gray.900', 'gray.50')}
                      color={useColorModeValue('white', 'gray.900')}
                      textTransform={'uppercase'}
                      _hover={{
                        transform: 'translateY(2px)',
                        boxShadow: 'lg'
                      }}
                      onClick={() => addProduct(articulo)}
                    >
                      Agregar al carrito
                    </Button>
                  </Stack>
                </SimpleGrid>
              </Container>
            )
          })}
    </Flex>
  )
}

export default Descripcion
