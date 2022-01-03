import React from 'react'
import { Box, Center, Flex, Icon, SimpleGrid } from '@chakra-ui/react'
import { SiGoogleclassroom } from 'react-icons/si'
import { ImSun } from 'react-icons/im'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { FaFemale, FaUsersSlash } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi'
import { IoLogOutOutline } from 'react-icons/io5'
export default function SectionShiftHeader() {

    const data = JSON.parse(localStorage.getItem('user_logged'))

    console.log(data)

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

                {/* <Box
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
                    <Flex>
                        <Box opacity={0.7} p="15px" width={'50px'} h="50px" bg="#3D9E35" borderRadius={'10px'}>
                            <Icon as={GiTeacher} color={'white'} w="20px" h="20px" />
                        </Box>
                        <Box ml='20px'>
                            <Box fontSize={"20px"} fontWeight={'light'} mt="2px" >
                                Tok Kana

                            </Box>
                            <Box fontSize={"12px"} fontWeight={'semibold'}  >Teacher</Box>
                        </Box>
                    </Flex>
                </Box> */}

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
                                {data?.teacherId?.lastName} {data?.teacherId?.firstName}
                            </Box>
                            <Box fontSize={"12px"} fontWeight={'semibold'}  >Teacher</Box>
                        </Box>
                        <Box cursor={'pointer'} position={"absolute"} right={0} opacity={0.7} p="15px" width={'50px'} h="50px" bg="red" borderRadius={'10px'}  >
                            <Icon as={IoLogOutOutline} color={'white'} w="20px" h="20px" />
                        </Box>
                    </Flex>
                </Box>
            </SimpleGrid>
        </Center >
    )
}
