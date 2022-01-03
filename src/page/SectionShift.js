import { useQuery } from '@apollo/client';
import { Box, Center, SimpleGrid } from '@chakra-ui/react'
import React, { useState } from 'react'
import SectionShiftCard from '../component/SectionShiftCard'
import SectionShiftHeader from '../component/SectionShiftHeader';
import Student from '../component/Student'
import { GET_SECTIONSHIFT_BY_TEACHER_ID } from '../schema/sectionshift';

export default function SectionShift() {

    const [sectionShiftData,setSectionShiftData] = useState([])

    const { loading, error, data } = useQuery(GET_SECTIONSHIFT_BY_TEACHER_ID, {
        variables: {
            personalInfoId: "61cc0d748d045a907b5885d7",
        },
        onCompleted:({getSectionShiftByTeacherId})=>{
            setSectionShiftData(getSectionShiftByTeacherId)
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

                    columns={[2, 2, 3, 4, 4, 4]}
                    spacing='20px'
                    mt="20px"
                >
                    {/* {
                       data &&
                       data.getStudentforPickingUP.map(stu =>
                           <Student
                               key={stu._id}
                               stuID={stu._id}
                               stuName={stu.englishName}
                               transportation={stu.transportation}
                               profile={stu.profileImg}
                           />
                       )
                   } */}

                    {/* <ClassCard data={e} index={index} /> */}
                    {
                        sectionShiftData?.map((e,index)=>{
                            console.log(e)
                            return (
                                <SectionShiftCard key={e?._id} data={e} index={index} />
                            )
                        })
                    }

                    {/* <Student
                        stuName={'Dy Dyka'}
                        transportation={"BUS"}
                    />
                    <Student
                        stuName={'Dy Dyka'}
                        transportation={"BUS"}
                    />
                    <Student
                        stuName={'Dy Dyka'}
                        transportation={"BUS"}
                    />
                    <Student
                        stuName={'Dy Dyka'}
                        transportation={"BUS"}
                    />
                    <Student
                        stuName={'Dy Dyka'}
                        transportation={"BUS"}
                    />
                    <Student
                        stuName={'Dy Dyka'}
                        transportation={"BUS"}
                    />
                    <Student
                        stuName={'Dy Dyka'}
                        transportation={"BUS"}
                    />
                    <Student
                        stuName={'Dy Dyka'}
                        transportation={"BUS"}
                    />
                    <Student
                        stuName={'Dy Dyka'}
                        transportation={"BUS"}
                    /> */}

                </SimpleGrid>

            </Center>
        </Box>
    )
}
