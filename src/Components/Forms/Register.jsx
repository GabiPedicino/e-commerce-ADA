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

const Register = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const { login } = useContext(CartContext);

  return (
    <Formik
      initialValues={{
        nombre: "",
        password: "",
        email: "",
      }}
      validate={(values) => {
        const errors = {};

        if (!values.nombre) {
          errors.nombre = "Requerido";
        } else if (/^[A-Za-z0-9]*$/.test(values.nombre)) {
          errors.nombre = "Debe contener solo letras";
        }

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
      onSubmit={async (values, { resetForm }) => {
        try {
          const { data } = await axios.post(
            "https://strapiecommerce-production.up.railway.app/api/auth/local/register",
            {
              username: values.nombre,
              email: values.email,
              password: values.password,
            }
          );
          toast({
            title: `Su cuenta ${values.email} ha sido registrada con exito`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          resetForm();
          login(data);
        } catch (error) {
          toast({
            title: "No se ha registrado correctamente",
            description: error.message,
            status: "warning",
            duration: 9000,
            isClosable: true,
          });
        }
      }}
    >
      {({ isSubmitting, errors, touched, handleChange, values }) => (
        <Form>
          <ModalBody pb={6}>
            <FormControl isInvalid={!!errors.email && touched.email} mt={"4"}>
              <label htmlFor="nombre">Nombre y apellido</label>
              <Input
                id="nombre"
                name="nombre"
                type="text"
                variant="filled"
                onChange={handleChange}
                value={values.nombre}
              />
              {errors.nombre && (
                <FormErrorMessage>{errors.nombre}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.email && touched.email} mt={"4"}>
              <label htmlFor="email">Email</label>
              <Input
                id="email"
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
                  id="password"
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
              Crear cuenta
            </Button>
          </ModalFooter>
        </Form>
      )}
    </Formik>
  );
};
export default Register;
