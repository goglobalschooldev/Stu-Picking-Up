import { useQuery } from '@apollo/client';
import { Box, Center, SimpleGrid } from '@chakra-ui/react'
import React, { useState } from 'react'
import SectionShiftCard from '../component/SectionShiftCard'
import SectionShiftHeader from '../component/SectionShiftHeader';
import Student from '../component/Student'
import { GET_SECTIONSHIFT_BY_TEACHER_ID } from '../schema/sectionshift';

export default function SectionShift() {

    const [sectionShiftData, setSectionShiftData] = useState([])
    let user = JSON.parse(localStorage.getItem("user_logged"))

    // console.log(user)

    const { loading, error, data } = useQuery(GET_SECTIONSHIFT_BY_TEACHER_ID, {
        variables: {
            personalInfoId: user?.teacherId?._id,
        },
        onCompleted: ({ getSectionShiftByTeacherId }) => {
            // console.log(getSectionShiftByTeacherId)
            setSectionShiftData(getSectionShiftByTeacherId);
         
        }
    });
    
    return (
        <Box>
            <SectionShiftHeader />
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

                    columns={[1, 2, 2, 3, 3, 4]}
                    spacing='20px'
                    mt="20px"
                >

                    {
                        sectionShiftData?.map((e, index) => {
                            return (
                                <SectionShiftCard key={e?._id} data={e} index={index} />
                            )
                        })
                    }

                </SimpleGrid>

            </Center>
        </Box>
    )
}
