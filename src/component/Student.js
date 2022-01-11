import { Box, Center, Image, Icon, Flex, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { ImWarning } from 'react-icons/im'
import { useSubscription,useQuery } from '@apollo/client';
import { GET_STUDENTPICKUP, STU_SUBCRIPTION } from '../schema/student';

export default function Student({ data,classId }) {
    const [isOpen, setIsOpen] = useState(false)
    const [leave, setLeave] = useState(false)
    const onClose = () => setIsOpen(false)
    const onLeave = () => {
        setIsOpen(false)
        setLeave(true)
    }
    const cancelRef = useRef()

    const { data:d, loading } = useSubscription(
        STU_SUBCRIPTION,
        { variables: { studentId: data?._id } }
    );

    // const {data:pickData,loading:pickup} = useQuery(GET_STUDENTPICKUP,{
    //     variables:{
    //         studentId:data?._id,
    //         date:new Date()
    //     },
    //     onCompleted:({getStudentPickupBystudentIdClassIdAndDate})=>{
    //         // console.log(getStudentPickupBystudentIdClassIdAndDate)
    //     }
    // })

    // console.log(pickData)

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
                d &&
                    d.pickingUpFilter.picked ? 'stu-boder' : ''
            }
            cursor={"pointer"}
            onClick={() => setIsOpen(true)}
        >
            <Box>
                <Center>
                    <Image
                        objectFit={'cover'}
                        borderRadius='full'
                        boxSize='95px'
                        mt={"25px"}
                        src={`${process.env.React_App_UPLOAD_URL}${data?.profileImg}`}
                        // src={st}
                        alt='Dan Abramov'
                    />
                </Center>
            </Box>
            <Box
                textAlign={"center"}
                fontWeight={"semibold"}
                mt="20px"
            >
                {/* {data?.lastName} {data?.firstName} */}
                {data?.englishName}
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
                {data?.transportation}
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
