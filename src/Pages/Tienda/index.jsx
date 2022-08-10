import { useState } from 'react'

import {
  Heading,
  Flex,
  Input,
  Container,
  Box,
  FormLabel,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  FormControl,
  Switch,
  Button,
  useColorModeValue,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react'
import { BsCart } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import useGet from '../../Hooks/useGet'
import Cards from '../../Main/Cards'
import Paginado from './Paginado'

const elementsForPage = 6

const Tienda = () => {
  const [page, setPage] = useState(1)
  const [productos, setProducto] = useState([])
  const { data } = useGet('/products?populate[0]=image')
  const [minFilterSlider, setMinFilterSlider] = useState(0)
  const [maxFilterSlider, setMaxFilterSlider] = useState(25000)

  const lastPage = Math.ceil(productos.length / elementsForPage)
  const offPage = elementsForPage * (page - 1)

  const handleOnKeyPress = (event) => {
    const filtrarP = data.data.filter((productFl) =>
      productFl.attributes.title.toLowerCase().includes(event.target.value)
    )

    setProducto(filtrarP)
    setPage(1)
  }

  const handleRangeSlider = (value) => {
    console.log(value)
    const minValue = value[0]
    const maxValue = value[1]
    setMinFilterSlider(minValue)
    setMaxFilterSlider(maxValue)
    const filtrarPrecio = data.data.filter(
      (product) =>
        product.attributes.price >= minValue &&
        product.attributes.price <= maxValue
    )
    setProducto(filtrarPrecio)
    setPage(1)
  }

  return (
    <>
      <Container maxW="container.xl" mt="5">
        <Flex>
          <Box w={'20%'}>
            <Box>
              <Text
                fontSize={'35px'}
                fontWeight={'bold'}
                pb={'30px'}
                pt={'30px'}
              >
                Productos
              </Text>
            </Box>
            <Box>
              <Input
                type="search"
                placeholder="Buscar..."
                mb={'30px'}
                onKeyDown={handleOnKeyPress}
              />
            </Box>

            <Box>
              <FormLabel htmlFor="" fontSize={'15px'}>
                Filtrar por precio
              </FormLabel>
              <RangeSlider
                onChangeEnd={handleRangeSlider}
                aria-label={['min', 'max']}
                defaultValue={[0, 25000]}
                min={0}
                max={25000}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <h1>Precio: ${minFilterSlider} - ${maxFilterSlider}</h1>
            </Box>

            <FormControl display="flex" flexDirection={'column'} mt={'30px'}>
              <FormLabel htmlFor="stock" mb="0">
                Unidades disponibles
              </FormLabel>
              <Switch id="stock" mt={'15px'} />
            </FormControl>
          </Box>

          <Box w={'80%'}>
            <Flex flexDir={'column'}>
              <Flex flexWrap="wrap" justifyContent="space-around">
                {!!productos.length || (
                  <Cards offPage={offPage} elementsForPage={elementsForPage} />
                )}

                {!!productos.length &&
                  [...productos]
                    .splice(offPage, elementsForPage)
                    .map((producto) => {
                      return (
                        <Flex py={12} key={`Card${producto.id}`}>
                          <Box
                            role={'group'}
                            p={4}
                            maxW={'330px'}
                            w={'full'}
                            bg={useColorModeValue('white', 'gray.800')}
                            boxShadow={'2xl'}
                            rounded={'lg'}
                            pos={'relative'}
                            zIndex={1}
                          >
                            <Box
                              rounded={'lg'}
                              mt={1}
                              pos={'relative'}
                              height={'250px'}
                              _after={{
                                transition: 'all .3s ease',
                                content: '""',
                                w: 'full',
                                h: 'full',
                                pos: 'absolute',
                                top: 5,
                                left: 0,
                                backgroundImage:
                                  producto.attributes.image.data.attributes
                                    .formats.url,
                                zIndex: -1,
                              }}
                            >
                              <Link
                                to={`productos/${producto.attributes.title}`}
                              >
                                <Image
                                  rounded={'lg'}
                                  height={280}
                                  width={282}
                                  objectFit={'cover'}
                                  src={
                                    producto.attributes.image.data.attributes
                                      .formats.thumbnail.url
                                  }
                                />
                              </Link>
                            </Box>
                            <Stack pt={10} align={'center'}>
                              <Heading
                                fontSize={'2xl'}
                                fontFamily={'body'}
                                fontWeight={500}
                              >
                                {producto.attributes.title}
                              </Heading>
                              <Stack direction={'row'} align={'center'}>
                                <Text fontWeight={800} fontSize={'xl'}>
                                  {producto.attributes.price}
                                </Text>
                              </Stack>
                            </Stack>
                            <Flex justifyContent="center" alignItems="center">
                              <Button
                                rounded={'md'}
                                w={'50'}
                                mt={2}
                                size={'md'}
                                py={'3'}
                                bg={useColorModeValue('white', 'gray.900')}
                                color={useColorModeValue('gray.900', 'gray.50')}
                                textTransform={'uppercase'}
                                _hover={{
                                  transform: 'translateY(2px)',
                                  boxShadow: 'lg',
                                  bg: 'gray.900',
                                  color: 'white',
                                }}
                                onClick={() => addProduct(producto)}
                              >
                                <BsCart />
                              </Button>
                            </Flex>
                          </Box>
                        </Flex>
                      )
                    })}
              </Flex>
            </Flex>
            <Paginado page={page} setPage={setPage} lastPage={lastPage} />
          </Box>
        </Flex>
      </Container>
    </>
  )
}

export default Tienda
