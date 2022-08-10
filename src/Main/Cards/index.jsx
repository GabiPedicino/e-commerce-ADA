import { useContext } from "react";

import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Flex,
} from "@chakra-ui/react";
import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";

import CartContext from "../../Context/CartContext";
import useGet from "../../Hooks/useGet";

const Cards = ({ offPage, elementsForPage }) => {
  const { data } = useGet("/products?populate[0]=image");
  const { addProduct } = useContext(CartContext);

  return (
    <Flex flexWrap="wrap" justifyContent="space-around" mt={"6"}>
      {data &&
        [...data.data].splice(offPage, elementsForPage).map((producto) => {
          return (
            <Flex py={12} key={`Card${producto.id}`}>
              <Box
                role={"group"}
                p={4}
                maxW={"330px"}
                w={"full"}
                bg={useColorModeValue("white", "gray.800")}
                boxShadow={"2xl"}
                rounded={"lg"}
                pos={"relative"}
                zIndex={1}
              >
                <Box
                  rounded={"lg"}
                  mt={1}
                  pos={"relative"}
                  height={"250px"}
                  _after={{
                    transition: "all .3s ease",
                    content: '""',
                    w: "full",
                    h: "full",
                    pos: "absolute",
                    top: 5,
                    left: 0,
                    backgroundImage:
                      producto.attributes.image.data.attributes.formats.url,
                    zIndex: -1,
                  }}
                >
                  <Link to={`productos/${producto.attributes.title}`}>
                    <Image
                      rounded={"lg"}
                      height={280}
                      width={282}
                      objectFit={"cover"}
                      src={
                        producto.attributes.image.data.attributes.formats
                          .thumbnail.url
                      }
                    />
                  </Link>
                </Box>
                <Stack pt={10} align={"center"}>
                  <Heading
                    fontSize={"2xl"}
                    fontFamily={"body"}
                    fontWeight={500}
                  >
                    {producto.attributes.title}
                  </Heading>
                  <Stack direction={"row"} align={"center"}>
                    <Text fontWeight={800} fontSize={"xl"}>
                      {producto.attributes.price}
                    </Text>
                  </Stack>
                </Stack>
                <Flex justifyContent="center" alignItems="center">
                  <Button
                    rounded={"md"}
                    w={"50"}
                    mt={2}
                    size={"md"}
                    py={"3"}
                    bg={useColorModeValue("white", "gray.900")}
                    color={useColorModeValue("gray.900", "gray.50")}
                    textTransform={"uppercase"}
                    _hover={{
                      transform: "translateY(2px)",
                      boxShadow: "lg",
                      bg: "gray.900",
                      color: "white",
                    }}
                    onClick={() => addProduct(producto)}
                  >
                    <BsCart />
                  </Button>
                </Flex>
              </Box>
            </Flex>
          );
        })}
    </Flex>
  );
};

export default Cards;
