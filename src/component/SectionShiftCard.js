import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Divider,
    Image,
    Button,
    useDisclosure,
} from '@chakra-ui/react'
import { useHistory } from 'react-router'
import { randomColor } from '../function/fn'
import image_cover from "../images/classs_cover.png"
// import { AiOutlineClockCircle } from 'react-icons/ai';
import { Flex } from '@chakra-ui/react'
import { GiGraduateCap } from 'react-icons/gi';
import { FaUserCheck } from "react-icons/fa"
import {AiOutlineSchedule} from "react-icons/ai"

export default function SectionShiftCard({ data, index }) {
    const history = useHistory()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Box
                h="380px"
                bg="white"
                mt="10px"
                className='card-sectionshift'
                borderRadius={'10px'}
                cursor={"pointer"}
                onClick={onOpen}
            >
                <Box
                    w='100%'
                    h={'60%'}
                    borderRadius={'lg'}
                    bg={randomColor(index)}

                >
                    <Image
                        boxSize='100%'
                        objectFit='cover'
                        borderRadius={'lg'}
                        src={image_cover}
                    />
                </Box>
                <Box
                    mt={"20px"}
                    mb={"10px"}
                    ml={"25px"}
                    fontSize={"25px"}
                    fontFamily={'Bayon'}
                    lineHeight='tight'
                    isTruncated

                >
                    <h4>{data?.sectionShiftName}</h4>
                </Box>
                <Divider />
                <Box
                    textAlign={"left"}
                    fontSize={"20px"}
                    fontFamily={'Segoe UI'}
                    ml={"25px"}
                    mt="20px"
                    paddingBottom={"15px"}
                >
                    <Flex>
                        <Box
                            h={'40px'}
                            mt={"5px"}
                        >
                            <GiGraduateCap />
                        </Box>
                        <Box
                            h={'40px'}
                            ml={"5px"}
                            fontFamily={'Bayon'}
                        >
                            {
                                data?.programId?.programmName
                            }
                        </Box>
                    </Flex>
                </Box>
            </Box>
            {/* </Button> */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">Where do you want to go?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody mb={5} justifyContent="center" w="100%" display="flex">
                        <Button colorScheme='blue' h={14} display="block" mr={5} onClick={() => history.push(`/attendance/${data?.classId?._id}&${data?.academicYearId?._id}&${data?._id}`)}>
                            <Box display="flex" justifyContent="center" fontSize={22}>
                                <AiOutlineSchedule/>
                            </Box>
                            Attendance
                        </Button>

                        <Button colorScheme='blue' h={14} display="block" onClick={() => history.push(`/classroom/${data?.classId?._id}&${data?.academicYearId?._id}&${data?._id}`)}>
                            <Box display="flex" justifyContent="center" fontSize={21}>
                                <FaUserCheck />
                            </Box>
                            Student pick up
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
