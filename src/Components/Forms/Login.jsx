import { useContext, useState } from "react";

import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import CartContext from "../../Context/CartContext";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const { login } = useContext(CartContext);

  return (
    <Formik
      initialValues={{
        password: "",
        email: "",
      }}
      validate={(values) => {
        const errors = {};

        if (!values.email) {
          errors.email = "Requerido";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Direccion de email invalida";
        }

        if (!values.password) {
          errors.password = "Requerido";
        } else if (values.password.length < 8) {
          errors.password = "Debe contener minimo 8 caracteres";
        }

        return errors;
      }}
      onSubmit={async (values) => {
        try {
          console.log("funciona");
          const { data } = await axios.post(
            "https://strapiecommerce-production.up.railway.app/api/auth/local",
            {
              identifier: values.email,
              password: values.password,
            }
          );
          login(data);
          toast({
            title: "Ha ingresado a su cuenta",
            description: data.mail,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } catch (error) {
          console.log("error");
          toast({
            title: "Los datos son incorrectos",
            description: error.message,
            status: "warning",
            duration: 9000,
            isClosable: true,
          });
        }
      }}
    >
      {({ isSubmitting, errors, touched, handleChange, values, register }) => (
        <Form>
          <ModalBody pb={6}>
            <FormControl isInvalid={!!errors.email && touched.email}>
              <label htmlFor="email" mt={"4"}>
                Email
              </label>
              <Input
                id="email1"
                name="email"
                type="email"
                variant="filled"
                onChange={handleChange}
                value={values.email}
              />
              {errors.email && (
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              isInvalid={!!errors.password && touched.password}
              mt={"4"}
            >
              <label htmlFor="password">Password</label>
              <InputGroup size="md">
                <Input
                  id="password1"
                  name="password"
                  type={show ? "text" : "password"}
                  variant="filled"
                  onChange={handleChange}
                  value={values.password}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? <BsEyeSlash /> : <BsEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>

              {errors.password && (
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="yellow" w={"100%"} mr={3}>
              Ingresa
            </Button>
          </ModalFooter>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
