import React, { useState, useEffect } from 'react';
import {
    Box, Center, Flex, Icon, SimpleGrid, Button, useDisclosure,
} from '@chakra-ui/react';
import { SiGoogleclassroom } from 'react-icons/si';
import { ImSun } from 'react-icons/im';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { FaFemale, FaUsersSlash } from 'react-icons/fa';
import { FiPrinter } from 'react-icons/fi';
import { GiTeacher } from 'react-icons/gi';
import { BsSave2 } from 'react-icons/bs';
import moment from 'moment';
import { useQuery } from '@apollo/client';
//components
import { getDaysInMonthUTC } from "../function/fn"
import PrintAttendance from "./PrintAttendance";

export default function AttendanceHeader({ data: sectionShift, setIsCreate, classId, printData }) {

    const data = JSON.parse(localStorage.getItem('user_logged'))

    // console.log("printData::", printData)

    let totalGirl = printData?.filter(e => e?.gender === "ស្រី")
    let totalAbsent = printData?.filter(e => e?.gender === "ស្រី")
    // console.log("first::", totalGirl?.length)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [daysMonth, setDaysMonth] = useState([]);
    let remarks = []

    const [isSetDay, setIsSetDay] = useState(true);

    useEffect(() => {
        if (isSetDay) {
            let header = [];
            let daysInMonth = getDaysInMonthUTC(
                new Date().getUTCMonth(),
                new Date().getUTCFullYear()
            );
            daysInMonth?.map((day) => {
                header.push({ label: `${parseInt(day)}`, key: `${parseInt(day)}` });
            });
            setIsSetDay(false);
            setDaysMonth(daysInMonth);
        }
    }, []);

    // console.log("daysMonth::", daysMonth)

    return (
        <Center>
            <SimpleGrid
                w={{
                    base: "90%",
                    md: "95%",
                    lg: "97%",
                    xl: "96%",
                    "2xl": "95%"
                }}

                columns={[1, 2, 3, 4, 6, 8]}
                spacing='20px'
            >

                <Box
                    w={{
                        bass: "0%",
                        md: "190px",
                        "2xl": "210px"
                    }}
                    h="70px"
                    mt="20px"
                    borderRadius={'10px'}
                    bg="white"
                    p="10px"
                >
                    <Flex>
                        <Box opacity={0.7} p="15px" width={'50px'} h="50px" bg="#3F69FF" borderRadius={'10px'}>
                            <Icon as={SiGoogleclassroom} color={'white'} w="20px" h="20px" />
                        </Box>
                        <Box ml='20px' >
                            <Box fontSize={"20px"} fontWeight={'nomal'} mt="2px" >{sectionShift?.sectionShiftName}</Box>
                            <Box fontSize={"12px"} fontWeight={'semibold'}  >{sectionShift?.academicYearId?.academicYear}</Box>
                        </Box>
                    </Flex>
                </Box>

                <Box
                    w={{
                        bass: "0%",
                        md: "190px",
                        "2xl": "210px"
                    }}
                    h="70px"
                    bg={'white'}
                    mt="20px"
                    borderRadius={'10px'}
                    p="10px"
                >
                    <Flex>
                        <Box opacity={0.7} p="15px" width={'50px'} h="50px" bg="#70D0F8" borderRadius={'10px'}>
                            <Icon as={ImSun} color={'white'} w="20px" h="20px" />
                        </Box>
                        <Box ml='20px' >
                            <Box fontSize={"20px"} fontWeight={'nomal'} mt="2px" >{sectionShift?.shiftId?.shiftName}</Box>
                            <Box fontSize={"12px"} fontWeight={'semibold'}  >Shift</Box>
                        </Box>
                    </Flex>
                </Box>
                <Box
                    w={{
                        bass: "0%",
                        md: "190px",
                        "2xl": "210px"
                    }}


                    h="70px"
                    bg={'white'}
                    mt="20px"
                    borderRadius={'10px'}
                    p="10px"
                >
                    <Flex>
                        <Box opacity={0.7} p="15px" width={'50px'} h="50px" bg="#3D9E35" borderRadius={'10px'}>
                            <Icon as={GiTeacher} color={'white'} w="20px" h="20px" />
                        </Box>
                        <Box ml='20px'>
                            <Box fontSize={"20px"} fontWeight={'light'} mt="2px" >
                                {data.firstName}
                            </Box>
                            <Box fontSize={"12px"} fontWeight={'semibold'}  >Teacher</Box>
                        </Box>
                    </Flex>
                </Box>

                <Box
                    w={{
                        bass: "0%",
                        md: "190px",
                        "2xl": "210px"
                    }}
                    h="70px"
                    bg={'white'}
                    mt="20px"
                    borderRadius={'10px'}
                    p="10px"
                >
                    <Flex>
                        <Box opacity={0.7} p="15px" width={'50px'} h="50px" bg="#7557F8" borderRadius={'10px'}>
                            <Icon as={HiOutlineUserGroup} color={'white'} w="20px" h="20px" />
                        </Box>
                        <Box ml='20px' >
                            <Box fontSize={"20px"} fontWeight={'light'} mt="2px">{printData?.length} px</Box>
                            <Box fontSize={"12px"} fontWeight={'semibold'}>Student Total</Box>
                        </Box>
                    </Flex>
                </Box>

                <Box
                    w={{
                        bass: "0%",
                        md: "190px",
                        "2xl": "210px"
                    }}
                    h="70px"
                    bg={'white'}
                    mt="20px"
                    borderRadius={'10px'}
                    p="10px"
                >
                    <Flex>
                        <Box opacity={0.7} p="15px" width={'50px'} h="50px" bg="red" borderRadius={'10px'}>
                            <Icon as={FaFemale} color={'white'} w="20px" h="20px" />
                        </Box>
                        <Box ml='20px' >
                            <Box fontSize={"20px"} fontWeight={'light'} mt="2px" >{totalGirl?.length} px</Box>
                            <Box fontSize={"12px"} fontWeight={'semibold'}  >Female</Box>
                        </Box>
                    </Flex>
                </Box>

                <Box
                    w={{
                        bass: "0%",
                        md: "190px",
                        "2xl": "210px"
                    }}
                    h="70px"
                    bg={'white'}
                    mt="20px"
                    borderRadius={'10px'}
                    p="10px"
                >
                    <Flex>
                        <Box opacity={0.7} p="15px" width={'50px'} h="50px" bg="red" borderRadius={'10px'}>
                            <Icon as={FaUsersSlash} color={'white'} w="20px" h="20px" />
                        </Box>
                        <Box ml='20px' >
                            <Box fontSize={"20px"} fontWeight={'light'} mt="2px" >1px</Box>
                            <Box fontSize={"12px"} fontWeight={'semibold'}  >Absent</Box>
                        </Box>
                    </Flex>
                </Box>

                <Box
                    w={{
                        bass: "0%",
                        md: "190px",
                        "2xl": "210px"
                    }}
                    h="70px"
                    bg={'white'}
                    mt="20px"
                    borderRadius={'10px'}
                    p="10px"
                >
                    <Flex>
                        <Button
                            opacity={0.7}
                            p="15px"
                            width={'50px'}
                            h="50px"
                            bg="#3F69FF"
                            borderRadius={'10px'}
                            color="#fff"
                            cursor="pointer"
                            onClick={onOpen}
                        >
                            <Icon as={FiPrinter} color={'white'} w="20px" h="20px" />
                        </Button>

                        <PrintAttendance
                            isOpen={isOpen}
                            onClose={onClose}
                            printData={printData}
                            sectionShift={sectionShift}
                            classId={classId}
                            daysMonth={daysMonth}
                        />
                        <Box mt="10px" ml="20px" fontSize={"16px"} fontWeight={'semibold'}>Print</Box>
                    </Flex>
                </Box>

                <Box
                    w={{
                        bass: "0%",
                        md: "190px",
                        "2xl": "210px"
                    }}
                    h="70px"
                    bg={'white'}
                    mt="20px"
                    borderRadius={'10px'}
                    p="10px"
                >
                    <Flex>
                        <Button
                            opacity={0.7}
                            p="15px"
                            width={'50px'}
                            h="50px"
                            bg="#3F69FF"
                            borderRadius={'10px'}
                            color="#fff"
                            cursor="pointer"
                            onClick={() => setIsCreate(true)}
                        >
                            <Icon as={BsSave2} color={'white'} w="20px" h="20px" />
                        </Button>
                        <Box mt="10px" ml="20px" fontSize={"16px"} fontWeight={'semibold'}>
                            Save
                        </Box>
                    </Flex>
                </Box>
            </SimpleGrid>
        </Center>
    )
}
