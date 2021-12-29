import { Box, Center, SimpleGrid, Image, Icon } from '@chakra-ui/react'
import React from 'react'
import ClassromHeader from '../component/ClassromHeader'
import Student from '../component/Student'
import { useQuery } from "@apollo/client";
import { GET_STUDENTS } from '../schema/student';
import brandlogo from '.././images/brandlogo.png'
import { IoLogOutOutline } from 'react-icons/io5'

export default function ClassRoom() {

    const { loading, error, data } = useQuery(GET_STUDENTS, {
        variables: {
            academicYearId: "61838053529bb760499bfec7",
            classId: "61a08e68f3aef0a2f902b574"
        }
    });

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;

    return (
        <Box>
            <ClassromHeader />
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

                    columns={[6, 0, 5, 5, 6, 7]}
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
                    />
                    <Student
                        stuName={'Dy Dyka'}
                        transportation={"BUS"}
                    />

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
