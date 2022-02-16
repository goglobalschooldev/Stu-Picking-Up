import { Box, Center, Image, Icon, Flex, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClockCircle, } from 'react-icons/ai';
import { RiMotorbikeFill } from 'react-icons/ri'
import { ImWarning } from 'react-icons/im'
import { useSubscription, useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { GET_STUDENTPICKUP, STU_SUBCRIPTION, UPDATE_STUDENTPICKUP } from '../schema/student';
import moment from 'moment';
import useSound from "use-sound";
import AlertSound from '../assets/sound/alert.mp3'
import { FcImageFile } from 'react-icons/fc'

export default function Student({ data, classId, setIsPicking, isPicking }) {

    // console.log(data)
    const [play] = useSound(AlertSound, { playbackRate: 1, interrupt: true })

    const [isOpen, setIsOpen] = useState(false)
    // const [leave, setLeave] = useState(false)
    const [studentData, setStudentData] = useState(null)

    const [studentPick, setStudentPick] = useState(null)

    const [isUpdated, setIsUpdated] = useState(false)

    const onClose = () => setIsOpen(false)

    const cancelRef = useRef()

    const [getStudentPickupBystudentIdClassIdAndDate, { loading, data: pickup, refetch }] = useLazyQuery(GET_STUDENTPICKUP, {
        onCompleted: ({ getStudentPickupBystudentIdClassIdAndDate }) => {
            if (getStudentPickupBystudentIdClassIdAndDate) {
                setStudentPick(getStudentPickupBystudentIdClassIdAndDate)
            }
            if (getStudentPickupBystudentIdClassIdAndDate?.picked && (getStudentPickupBystudentIdClassIdAndDate?.leftAt === null || getStudentPickupBystudentIdClassIdAndDate?.leftAt === undefined)) {
                let sum = isPicking + 1;
                setIsPicking(sum)
            }
        },
        fetchPolicy: 'cache-and-network'
    });

    useEffect(() => {
        if (data) {
            setStudentData(data)
        }
    }, [data])

    useEffect(() => {
        if (studentPick) {
            // play()
            setStudentData({ ...studentData, ...studentPick, transportation: studentData?.transportation })
            setStudentPick(null)
        }
    }, [studentPick])

    const { data: dataSub, loading: loadingSub } = useSubscription(
        STU_SUBCRIPTION,
        {
            variables: { studentId: data?._id },
            onSubscriptionComplete: ({ pickingUpFilter }) => {
                if (pickingUpFilter) {
                    refetch()
                    setIsUpdated(true)
                    setIsPicking(false)
                }
            }
        }
    );

    useEffect(() => {
        getStudentPickupBystudentIdClassIdAndDate({
            variables: {
                studentId: data?._id,
                date: new Date()
            }
        })
        setIsUpdated(false)
    }, [isUpdated, dataSub])

    const [updatePickingUp, { loading: loadingUpdate }] = useMutation(UPDATE_STUDENTPICKUP, {
        onCompleted: ({ updatePickingUp }) => {
            if (updatePickingUp?.success === true) {
                // setIsOpen(false)
                // setIsUpdated(true)
            } else {
                console.log(updatePickingUp?.message)
            }
        }
    })

    const onLeave = () => {
        const newPickingUp = {
            studentId: studentData?._id,
            studentName: studentData?.englishName,
            transportation: studentData?.transportation,
            picked: studentData?.picked,
            pickingUpAt: studentData?.pickingUpAt,
            leftAt: moment(new Date()),
            academicYearId: studentData?.academicYearId?._id,
            shift: studentData?.shift?._id
        }
        updatePickingUp({
            variables: {
                newPickingUp: newPickingUp,
                pickingUpId: studentData?.id
            }, update(_, result) {
                refetch()
                setIsOpen(false)
                setIsUpdated(true)

                let sum = isPicking - 1;
                setIsPicking(sum)
            }
        })
    }

    // console.log(studentData)

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
            mt="20px"
            p="5px"
            bg="red"
            fontSize={"12px"}
            width={"90px"}
            color={'white'}
            borderRadius={'md'}
        >
            <Center>
                <Flex>
                    <Icon as={RiMotorbikeFill} mt="3px" />
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
                bass: "0%",
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
                studentData?.picked && studentData?.leftAt === null ? 'stu-boder' : 'default-studend-card'
            }
            cursor={"pointer"}
            onClick={() => setIsOpen(true)}
        >
            <Box>
                <Center>
                    {
                        studentData?.profileImg ?

                            <Image
                                objectFit={'cover'}
                                borderRadius='full'
                                boxSize='95px'
                                mt={"25px"}
                                src={`${process.env.React_App_UPLOAD_URL}${studentData?.profileImg}`}
                            // src={st}
                            // alt='Dan Abramov'
                            />
                            :
                            <FcImageFile className='image-student' />
                    }
                </Center>
            </Box>
            <Box
                textAlign={"center"}
                fontWeight={"semibold"}
                mt="20px"
            >
                {/* {studentData?.lastName} {studentData?.firstName} */}
                {studentData?.englishName?.split(' ')[1]}
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
                {studentData?.transportation ? studentData?.transportation : 'Not set'}
            </Box>
            {
                !studentData?.picked ? activeUser : null
            }
            {
                studentData?.picked && studentData?.leftAt === null ? PickingUpUser : null
            }
            {
                studentData?.leftAt !== null && studentData?.leftAt !== undefined ? leaveUser : null
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
