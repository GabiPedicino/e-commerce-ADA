import { Flex, Spacer, Box, Button } from '@chakra-ui/react'

const Paginado = ({ setPage, page, LastPage }) => {
  return (
    <Flex>
      <Box>
        <Button
          colorScheme="yellow"
          aria-label="Call Segun"
          size="lg"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}> ANTERIOR </Button>
      </Box>
      <Spacer />
      <Box>
        <Button
          colorScheme="yellow"
          aria-label="Call Segun"
          size="lg"
          onClick={() => setPage(page + 1)}
          disabled={page === LastPage}> SIGUIENTE </Button>
      </Box>
    </Flex>
  )
}
export default Paginado
