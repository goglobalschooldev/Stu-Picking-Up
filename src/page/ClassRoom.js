import { Box, Center, SimpleGrid, Image, Icon } from '@chakra-ui/react'
import React, { useState } from 'react'
import ClassromHeader from '../component/ClassromHeader'
import Student from '../component/Student'
import { useQuery } from "@apollo/client";
import { GET_STUDENTS } from '../schema/student';
import brandlogo from '.././images/brandlogo.png'
import { IoLogOutOutline } from 'react-icons/io5'
import { useParams } from 'react-router-dom';

export default function ClassRoom() {

    const { classid, academicid } = useParams()

    const [studentData, setStudentData] = useState([])

    const { loading, error, data } = useQuery(GET_STUDENTS, {
        variables: {
            academicYearId: academicid,
            classId: classid
        },
        onCompleted: ({ getStudentforPickingUP }) => {
            console.log(getStudentforPickingUP)
            setStudentData(getStudentforPickingUP)
        }
    });

    console.log(data)

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;

    return (
        <Box>
            <ClassromHeader />
            <Center>


                <SimpleGrid
                    w={{
                        base: "90%",
                        sm: "90%",
                        md: "99%",
                        lg: "99%",
                        xl: "90%",
                        "2xl": "95%"
                    }}

                    columns={[2, 2, 4, 5, 6, 7]}
                    spacing='20px'
                    mt="20px"
                >
                    {
                        studentData && studentData.map(stu =>
                            <Student data={stu} classId={classid} key={stu._id} />
                        )
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
            <Box
                position={'fixed'}
                width={"100%"}
                bottom={0}
            >
                <Center>
                    <Box
                        w={{
                            base: "0%",
                            sm: "150px",
                            md: "150px",
                            lg: "190px",
                            xl: "200px",
                            "2xl": "200px"
                        }}
                        boxShadow={'md'}
                    >
                        <Image src={brandlogo} />
                    </Box>
                </Center>
            </Box>

        </Box >
    )
}
