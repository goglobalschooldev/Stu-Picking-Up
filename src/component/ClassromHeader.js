import React from 'react'
import { Box, Center, Flex, Icon, SimpleGrid } from '@chakra-ui/react'
import { SiGoogleclassroom } from 'react-icons/si'
import { ImSun } from 'react-icons/im'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { FaFemale, FaUsersSlash } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi'
import { IoLogOutOutline } from 'react-icons/io5'
export default function ClassromHeader() {
    return (
        <Center>
            <SimpleGrid
                w={{
                    base: "0%",
                    sm: "0%",
                    md: "99%",
                    lg: "99%",
                    xl: "90%",
                    "2xl": "95%"
                }}

                columns={[6, 0, 5, 5, 6, 6]}
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
                            <Box fontSize={"20px"} fontWeight={'nomal'} mt="2px" >YEAR 5A</Box>
                            <Box fontSize={"12px"} fontWeight={'semibold'}  >2020-2021</Box>
                        </Box>
                    </Flex>
                </Box>

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
                    <Flex>
                        <Box opacity={0.7} p="15px" width={'50px'} h="50px" bg="#70D0F8" borderRadius={'10px'}>
                            <Icon as={ImSun} color={'white'} w="20px" h="20px" />
                        </Box>
                        <Box ml='20px' >
                            <Box fontSize={"20px"} fontWeight={'nomal'} mt="2px" >Morning</Box>
                            <Box fontSize={"12px"} fontWeight={'semibold'}  >Shift</Box>
                        </Box>
                    </Flex>
                </Box>
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
                </Box>
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
                    <Flex>
                        <Box opacity={0.7} p="15px" width={'50px'} h="50px" bg="#7557F8" borderRadius={'10px'}>
                            <Icon as={HiOutlineUserGroup} color={'white'} w="20px" h="20px" />
                        </Box>
                        <Box ml='20px' >
                            <Box fontSize={"20px"} fontWeight={'light'} mt="2px" >20px</Box>
                            <Box fontSize={"12px"} fontWeight={'semibold'}  >Student Total</Box>
                        </Box>
                    </Flex>
                </Box>
                <Box
                    w={{
                        bass: "0%",
                        sm: "0%",
                        md: "190px",
                        lg: "190px",
                        xl: "190px",
                        "2xl": "210px"
                    }}
                    display={['none', 'none', 'none', 'none', 'flex', 'flex']}
                    h="70px"
                    bg={'white'}
                    mt="20px"
                    borderRadius={'10px'}
                    p="10px"
                >
                    <Flex>
                        <Box opacity={0.7} p="15px" width={'50px'} h="50px" bg="#F29BB3" borderRadius={'10px'}>
                            <Icon
                                as={FaFemale}
                                color={'white'}
                                w="20px"
                                h="20px"
                            />
                        </Box>
                        <Box ml='20px' >
                            <Box fontSize={"20px"} fontWeight={'light'} mt="2px" >10px</Box>
                            <Box fontSize={"12px"} fontWeight={'semibold'}  >Female</Box>
                        </Box>
                    </Flex>
                </Box>
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
                        <Box opacity={0.7} p="15px" width={'50px'} h="50px" bg="red" borderRadius={'10px'}>
                            <Icon as={FaUsersSlash} color={'white'} w="20px" h="20px" />
                        </Box>
                        <Box ml='20px'>
                            <Box fontSize={"20px"} fontWeight={'light'} mt="2px" >2px</Box>
                            <Box fontSize={"12px"} fontWeight={'semibold'}  >Absent</Box>

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
