import React, { useState } from 'react'

import { Container } from '@chakra-ui/react'

import Cards from '../../Main/Cards'
import Carousel from '../../Main/Carousel'
import Paginado from '../Tienda/Paginado'

const Home = ({ data }) => {
  const [page, setPage] = useState(1)
  const elementsForPage = 6
  const lastPage = Math.ceil([data].length / elementsForPage)
  const offPage = elementsForPage * (page - 1)
  return (
    <>
      <Container maxW="container.xl" mt="5">
        <Carousel />
        <Cards offPage={offPage} elementsForPage={elementsForPage} />
        <Paginado page={page} setPage={setPage} lastPage={lastPage} />
      </Container>
    </>
  )
}

export default Home
