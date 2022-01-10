import { Box, Divider, Image } from '@chakra-ui/react'
import React from 'react'
import { useHistory } from 'react-router'
import { randomColor } from '../function/fn'
import image_cover from "../images/classs_cover.jpg"
// import { AiOutlineClockCircle } from 'react-icons/ai';
import { Flex } from '@chakra-ui/react'
import { GiGraduateCap } from 'react-icons/gi';


export default function SectionShiftCard({ data, index }) {
    const history = useHistory()
    console.log(data)
    return (
        <>
            <Box
                h="380px"
                bg="white"
                mt="10px"
                className='card-sectionshift'
                borderRadius={'10px'}

                cursor={"pointer"}
                onClick={() => history.push(`/classroom/${data?.classId?._id}&${data?.academicYearId?._id}`)}
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
                        src={image_cover} alt={image_cover}
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
        </>
    )
}
