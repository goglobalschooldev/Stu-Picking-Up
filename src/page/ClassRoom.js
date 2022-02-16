import { Box, Center, SimpleGrid, Image, Icon } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ClassromHeader from '../component/ClassromHeader'
import Student from '../component/Student'
import { useQuery } from "@apollo/client";
import { GET_STUDENTS } from '../schema/student';
import brandlogo from '.././images/brandlogo.png'
import { IoLogOutOutline } from 'react-icons/io5'
import { useParams } from 'react-router-dom';
import { GET_SECTIONSHIFT_BY_ID } from '../schema/sectionshift';
import useSound from "use-sound";
import AlertSound from '../assets/sound/alert.mp3'

export default function ClassRoom() {
    const [play] = useSound(AlertSound, {playbackRate:1, interrupt: true });
    const [isPicking,setIsPicking] = useState(0)

    const { classid, academicid,sectionshift } = useParams()

    const [studentData, setStudentData] = useState([])
    const [classData,setClassData] = useState(null)

    const { loading, error, data } = useQuery(GET_STUDENTS, {
        variables: {
            academicYearId: academicid,
            classId: classid
        },
        onCompleted: ({ getStudentforPickingUP }) => {
            setStudentData(getStudentforPickingUP)
        }
    });

    const { loading:sectionLoading, data:section } = useQuery(GET_SECTIONSHIFT_BY_ID, {
        variables: {
            sectionShiftId: sectionshift,
        },
        onCompleted: ({ getSectionShiftById }) => {
            setClassData(getSectionShiftById)
        }
    });

    // useEffect(() => {
    //     if(isPicking > 0){
    //         play()
    //     }
    // }, [isPicking])

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;

    return (
        <Box className={ isPicking > 0 ? 'alert-pickup-bg':''}>
            <ClassromHeader />
            <Center>
           
                <SimpleGrid
                    w={{
                        base: "90%",
                        sm: "90%",
                        md: "95%",
                        lg: "97%",
                        xl: "96%",
                        "2xl": "95%"
                    }}

                    columns={[2, 2, 4, 5, 6, 7]}
                    spacing='20px'
                    mt="20px"
                    mb={100}
                >
                    {
                        studentData && studentData.map(stu =>

                            <Student
                                data={stu}
                                key={stu._id}
                                setIsPicking={setIsPicking}
                                isPicking={isPicking}
                            />
                        )
                    }


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
