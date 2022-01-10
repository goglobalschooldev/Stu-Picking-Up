import React from 'react'
import { Box, Center, Flex, Icon, SimpleGrid, useToast } from '@chakra-ui/react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    AlertDialogCloseButton,
    Button
} from '@chakra-ui/react'
import { GiTeacher } from 'react-icons/gi'
import { IoLogOutOutline } from 'react-icons/io5';

export default function SectionShiftHeader() {
    let toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const data = JSON.parse(localStorage.getItem('user_logged'))

    const logOut = () => {
        localStorage.removeItem("user_logged")
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")

        toast({
            title: 'Log Out Success!',
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    return (
        <Center>
            <SimpleGrid
                w={{
                    base: "90%",
                    sm: "90%",
                    md: "80%",
                    lg: "80%",
                    xl: "80%",
                    "2xl": "70%"
                }}

                columns={[1, 1, 1, 1, 1, 1]}
                spacing='20px'
            >

                <Box
                    w={{
                        bass: "0%",
                        sm: "0%",
                        md: "190px",
                        lg: "190px",
                        xl: "190px",
                        "2xl": "210px"
                    }}
                    h="70px"
                    bg={'white'}
                    mt="20px"
                    borderRadius={'10px'}
                    p="10px"
                >
                    <Flex position={'relative'}>
                        <Box opacity={0.7} p="15px" width={'50px'} h="50px" bg="#3D9E35" borderRadius={'10px'}>
                            <Icon as={GiTeacher} color={'white'} w="20px" h="20px" />
                        </Box>
                        <Box ml='20px'>
                            <Box fontSize={"20px"} fontWeight={'light'} mt="2px" >
                                {data?.lastName} {data?.firstName}
                            </Box>
                            <Box fontSize={"12px"} fontWeight={'semibold'}  >Teacher</Box>
                        </Box>
                        <Box onClick={onOpen} cursor={'pointer'} position={"absolute"} right={0} opacity={0.7} p="15px" width={'50px'} h="50px" bg="red" borderRadius={'10px'}  >
                            <Icon as={IoLogOutOutline} color={'white'} w="20px" h="20px" />
                        </Box>
                    </Flex>
                </Box>
            </SimpleGrid>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Do you want to Logout?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to log out?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            No
                        </Button>
                        <Button colorScheme='green' ml={3}
                            onClick={() => {
                                onClose()
                                logOut()
                                window.location.reload();
                            }}
                        >
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Center >
    )
}
