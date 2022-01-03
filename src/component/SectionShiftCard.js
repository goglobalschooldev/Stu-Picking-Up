import { Box, Center, Divider, Image } from '@chakra-ui/react'
import React from 'react'
import { useHistory } from 'react-router'
import { randomColor } from '../function/fn'

export default function SectionShiftCard({ data, index }) {
    const history = useHistory()
    return (
        <>
           
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
                className='card-sectionshift'
                borderRadius={'10px'}
                // className={
                //     data &&
                //         data.pickingUpFilter.picked ? 'stu-boder' : ''
                // }
                cursor={"pointer"}
                onClick={() => history.push(`/classroom/${data?.classId?._id}&${data?.academicYearId?._id}`)}
            >
                <Box
                    textAlign={"center"}
                    fontSize={"15px"}
                    fontWeight={"semibold"}
                    h="40%"
                    bg={randomColor(index)}
                    
                >
                    
                </Box>

                <Box>
                    <Center mt="20px" mb="20px" fontWeight={"semibold"}>
                        <h3>{data?.sectionShiftName}</h3>
                    </Center>
                </Box>
                <Divider />
                
                <Box
                    textAlign={"center"}
                    fontSize={"13px"}
                    mt="12px"
                >
                    Shift
                </Box>
                <Box
                    textAlign={"center"}
                    fontSize={"15px"}
                    fontWeight={"semibold"}
                >
                    {data?.shiftId?.shiftName}
                </Box>
                
                {/* <AlertDialog
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
                </AlertDialog> */}
            </Box>
        </>
    )
}
