import { useContext } from 'react'

import { Box, Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react'
import {
  BsFillTrashFill,
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill
} from 'react-icons/bs'

import CartContext from '../../Context/CartContext'

const Producto = ({ producto }) => {
  const { deleteProduct, addProduct, remProduct } = useContext(CartContext)

  return (
    <Flex mt="5" key={`producto${producto.id}`}>
      <Image
        src={producto.attributes.image.data.attributes.formats.thumbnail.url}
        w="40%"
        objectFit="cover"
        alt={`imagen de producto ${producto.attributes.title}`}
      />
      <Box>
        <Heading size="sm"> {producto.attributes.title}</Heading>
        <Text>${producto.attributes.price}</Text>
        <Text>
          {producto.cantidad} {producto.cantidad > 1 ? 'unidades' : 'unidad'}
        </Text>
        <IconButton
          icon={<BsFillArrowLeftCircleFill />}
          onClick={() => remProduct(producto)}
        />
        <IconButton
          icon={<BsFillArrowRightCircleFill />}
          onClick={() => addProduct(producto)}
        />
        {producto.cantidad > 0 ?
            (
          <IconButton
            icon={<BsFillTrashFill />}
            onClick={() => deleteProduct(producto.id)}
          />
            )
          :
            (
              deleteProduct(producto.id)
            )}
      </Box>
    </Flex>
  )
}

export default Producto
