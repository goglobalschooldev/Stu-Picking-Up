import { Box, Center, Image, Icon, Flex, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { ImWarning } from 'react-icons/im'
import studentImage from '../images/DSC01658.jpg';
import { useSubscription } from '@apollo/client';
import { STU_SUBCRIPTION } from '../schema/student';

export default function Student({ stuID, stuName, transportation, profile }) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [leave, setLeave] = useState(false)
    const onClose = () => setIsOpen(false)
    const onLeave = () => {
        setIsOpen(false)
        setLeave(true)
    }
    const cancelRef = React.useRef()
    const { data, loading } = useSubscription(
        STU_SUBCRIPTION,
        { variables: { studentId: stuID } }
    );



    const activeUser = <Center>
        <Box
            mt="20px"
            p="5px"
            bg="brand.button"
            fontSize={"12px"}
            width={"70px"}
            color={'white'}
            borderRadius={'md'}
        >
            <Center>
                <Flex>
                    <Icon as={AiOutlineClockCircle} mt="3px" />
                    <Box ml='4px'>Active</Box>
                </Flex>
            </Center>
        </Box>
    </Center>
    const PickingUpUser = <Center>
        <Box

            p="5px"
            bg="red"
            fontSize={"12px"}
            width={"90px"}
            color={'white'}
            borderRadius={'md'}
        >
            <Center>
                <Flex>
                    <Icon as={AiOutlineClockCircle} mt="3px" />
                    <Box ml='4px'>Picking-Up</Box>
                </Flex>
            </Center>
        </Box>
    </Center>
    const leaveUser = <Center>
        <Box
            mt="20px"
            p="5px"
            bg="#484747"
            fontSize={"12px"}
            width={"70px"}
            color={'white'}
            borderRadius={'md'}
        >
            <Center>
                <Flex>
                    <Icon as={AiOutlineClockCircle} mt="3px" />
                    <Box ml='4px'>Leave</Box>
                </Flex>
            </Center>
        </Box>
    </Center>
    return (
        <Box
            w={{
                bass:"0%",
                sm: "0%",
                md: "190px",
                lg: "190px",
                xl: "190px",
                "2xl": "210px"
            }}
            h="280px"
            bg="white"
            mt="10px"
            borderRadius={'10px'}
            className={
                data &&
                    data.pickingUpFilter.picked ? 'stu-boder' : ''
            }
            cursor={"pointer"}
            onClick={() => setIsOpen(true)}
        >
            <Box>
                <Center>
                    <Image
                        borderRadius='full'
                        boxSize='95px'
                        mt={"25px"}
                        src={studentImage}
                        alt='Dan Abramov'
                    />
                </Center>
            </Box>
            <Box
                textAlign={"center"}
                fontWeight={"semibold"}
                mt="20px"
            >
                {stuName}
            </Box>
            <Box
                textAlign={"center"}
                fontSize={"12px"}
                mt="10px"
            >
                Transportation
            </Box>
            <Box
                textAlign={"center"}
                fontSize={"15px"}
                fontWeight={"semibold"}
            >
                {transportation}
            </Box>
            {
                // data &&
                //     data.pickingUpFilter.picked ? PickingUpUser :
                //     activeUser
                // PickingUpUser
                // leaveUser
                leave ? leaveUser : activeUser
            }
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader mt="10px" color={'green'} fontSize='20pt' fontWeight='bold'>
                            <Icon as={ImWarning} /> Attention
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Do you want to allow student to leave?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onLeave}>
                                Yes
                            </Button>
                            <Button colorScheme='red' onClick={onClose} ml={3}>
                                No
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    )
}
