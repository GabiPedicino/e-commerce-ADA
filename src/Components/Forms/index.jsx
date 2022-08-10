import React, { useContext, useEffect } from 'react'

import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { FaRegUser } from 'react-icons/fa'

import CartContext from '../../Context/CartContext'
import SesionIniciada from '../SesionIniciada'
import Login from './Login'
import Register from './Register'

const Forms = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { token } = useContext(CartContext)

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  useEffect(() => {
    if (token) {
      onClose()
    }
  }, [token])

  return (
    <>
      {!token && (
        <Button onClick={onOpen} bg={useColorModeValue('none')}>
          {<FaRegUser />}
        </Button>
      )}
      <SesionIniciada />

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <Tabs>
            <TabList>
              <Tab width={'50%'} mt={'3'}>
                Ingresar
              </Tab>
              <Tab width={'50%'} mt={'3'}>
                Registro
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ModalCloseButton />
                <Login />
              </TabPanel>
              <TabPanel>
                <ModalCloseButton />
                <Register />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Forms
