import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Box,
    Button,
    useDisclosure,
    Center,
    Wrap,
    WrapItem,
    Avatar,
    Stack,
    Input,
    ModalFooter,
    SimpleGrid
} from '@chakra-ui/react';
import { BsPersonCheck, BsPersonDash, BsPersonX } from 'react-icons/bs';
import { RiTimerLine } from 'react-icons/ri'
import { ImWarning } from 'react-icons/im'
import { useSubscription, useQuery, useLazyQuery, useMutation } from '@apollo/client';
import moment from 'moment';

export default function AttendanceCard({ data, classId, academicYearId,handleUpdate }) {
    // console.log(data)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [status,setStatus] = useState("PRESENT")
    const [statusNew,setStatusNew] = useState(false)
    const [remark,setRemark] = useState(data?.remark)

    const [statusIcon,setStatusIcon] = useState(<BsPersonCheck />)
    const [statusColor,setStatusColor] = useState('green.500')

    useEffect(() => {
        if(!statusNew && data?.status){
            // console.log(data)
            setRemark(data?.remark)
            if(data.status === "ABSENT"){
                setStatus("ABSENT")
                setStatusIcon(<BsPersonX />)
                setStatusColor('red.500')
            }else if(data.status === "LATE"){
                setStatus("LATE")
                setStatusIcon(<RiTimerLine />)
                setStatusColor('yellow.500')
            }else if(data.status === "PERMISSION"){
                setStatus("PERMISSION")
                setStatusIcon(<BsPersonDash />)
                setStatusColor('blue.500')
            }else {
                setStatus("PRESENT")
                setStatusIcon(<BsPersonCheck />)
                setStatusColor('green.500')
            }
        }
    },[data])

    const handleSetStatus =(e,remark)=>{

        let attendance = {
            studentId:data?.studentId?._id || data?._id,
            remark:remark,
        }

        if(e!==status){
            setStatus(e)
        }else{
            setStatus(status)
        }
        handleUpdate({...attendance,status:e})

    }

    const handleSetRemark = (e) =>{
        setStatusNew(true)
        setRemark(e)
        handleSetStatus(status,e)
    }


    const handlePresent = () => {
        setStatusNew(true)
        handleSetStatus('PRESENT',remark)
        setStatusIcon(<BsPersonCheck />)
        setStatusColor('green.500')
        onClose()
    }

    const handlePermission = () => {
        setStatusNew(true)
        handleSetStatus('PERMISSION',remark)
        setStatusIcon(<BsPersonDash />)
        setStatusColor('blue.500')
        onClose()
    }

    const handleLate = () => {
        setStatusNew(true)
        handleSetStatus('LATE',remark)
        setStatusIcon(<RiTimerLine />)
        setStatusColor('yellow.500')
        onClose()
    }

    const handleAbsence = () => {
        setStatusNew(true)
        handleSetStatus('ABSENT',remark)
        setStatusIcon(<BsPersonX />)
        setStatusColor('red.500')
        onClose()
    }

    return (
        <Box
            w={{
                bass: "0%",
                md: "190px",
                "2xl": "210px"
            }}
            h="280px"
            bg="white"
            mt="10px"
            borderRadius={'10px'}
            cursor={"pointer"}
            onClick={onOpen}
            _hover={{
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
            }}
        >
            
            <Box mt={8}>
                <Center>
                    <Wrap>
                        <WrapItem>
                            <Avatar size='xl' name={data?.englishName} src={`${process.env.React_App_UPLOAD_URL}${data?.profileImg}`} />
                        </WrapItem>
                    </Wrap>
                </Center>
            </Box>

            <Box
                textAlign="center"
                fontWeight="semibold"
                mt="20px"
            >
                {data?.englishName}
            </Box>
            <Box justifyContent="center" display="flex" mt={4}>
                <Button color="#fff" bgColor={statusColor}>
                    <Box mr={1}>
                        {
                            statusIcon === "" ? <BsPersonCheck /> : statusIcon
                        }
                    </Box>
                    {status}
                </Button>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center" fontSize={26} color="green">{data?.englishName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody mb={5}>
                        <Stack spacing={3}>
                            <Input placeholder='Remark' value={remark} size='lg' onChange={(e)=>handleSetRemark(e.target.value)} />
                        </Stack>
                    </ModalBody>
                    <ModalBody mb={5} justifyContent="center" display="flex">

                        <SimpleGrid
                            w={{
                                base: "90%",
                                sm: "90%",
                                md: "95%",
                                lg: "97%",
                                xl: "96%",
                                "2xl": "95%"
                            }}

                            columns={[1, 2, 2, 2, 2, 2]}
                            spacing='20px'
                        >
                            <Button bgColor="green" color="#fff" onClick={handlePresent}>
                                <Box mr={1}>
                                    <BsPersonCheck />
                                </Box>
                                Present
                            </Button>
                            <Button bgColor="blue" color="#fff" onClick={handlePermission}>
                                <Box mr={1}>
                                    <BsPersonDash />
                                </Box>
                                Permission
                            </Button>
                            <Button bgColor="orange" color="#fff" onClick={handleLate}>
                                <Box mr={1}>
                                    <RiTimerLine />
                                </Box>
                                Late
                            </Button>
                            <Button bgColor="red" color="#fff" onClick={handleAbsence}>
                                <Box mr={1}>
                                    <BsPersonX />
                                </Box>
                                Absence
                            </Button>
                        </SimpleGrid>


                    </ModalBody>
                    
                </ModalContent>
            </Modal>
        </Box>
    )
}
