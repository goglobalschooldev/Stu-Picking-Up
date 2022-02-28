import { Box, Center, SimpleGrid, Image, Icon, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import AttendanceHeader from '../component/AttendanceHeader'
import AttendanceCard from '../component/AttendanceCard'
import { useMutation, useQuery } from "@apollo/client";
import { GET_STUDENTS } from '../schema/student';
import brandlogo from '.././images/brandlogo.png'
import { useParams } from 'react-router-dom';
import { GET_SECTIONSHIFT_BY_ID } from '../schema/sectionshift';
import moment from 'moment';
import { getUserLoggedID, joinTwoArray } from '../function/fn';
import { CREATE_ATTENDANCE, GET_ATTENDANCE_BY_SECTIONSHIFTID, UPDATE_ATTENDANCE_BY_ID } from '../schema/attendance';

export default function Attendance() {
  const { classid, academicid, sectionshift } = useParams()

  const toast = useToast()
  const [isCreate, setIsCreate] = useState(false)

  const [studentData, setStudentData] = useState([])
  const [classData, setClassData] = useState(null)

  let newData = []
  const [studentList, setStudentList] = useState([])
  const [attendanceList, setAttendanceList] = useState(null)

  const [createAttendance, { loading: createLoading }] = useMutation(CREATE_ATTENDANCE, {
    onCompleted: ({ createAttendance }) => {
      if (createAttendance.success === true) {

        setStudentList([])
        toast({
          description: createAttendance.message,
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      } else {
        toast({
          description: createAttendance.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
    },
    onError: (error) => {
      toast({
        description: error.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  })

  const [updateAttendance, { loading: updateLoading }] = useMutation(UPDATE_ATTENDANCE_BY_ID, {
    onCompleted: ({ updateAttendance }) => {
      if (updateAttendance.success === true) {
        setStudentList([])

        toast({
          description: updateAttendance.message,
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      } else {
        toast({
          description: updateAttendance.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
    },
    onError: (error) => {
      toast({
        description: error.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  })

  const onFinish = () => {

    // if (academicYear === null) {
    //   openWarningNotification({ title: 'Warning', message: 'Academic year is required' })
    //   return;
    // }

    // console.log(joinTwoArray(newData, studentList))

    const newAttendance = {
      sectionShiftId: sectionshift,
      attendanceDate: moment(),
      academicYearId: academicid,
      students: joinTwoArray(newData, studentList),
      // note: note,
      

    }

    if (attendanceList) {

      if (studentList.length <= 0) {
        toast({
          description: 'Nothing changed',
          status: 'warning',
          duration: 2000,
          isClosable: true,
        })
        return;
      }

      updateAttendance({
        variables: {
          newAttendance: {...newAttendance},
          attendanceId: attendanceList?._id
        }
      })

      return
    }

    createAttendance({
      variables: {
        newAttendance: {...newAttendance,createdBy: getUserLoggedID()}
      }
    })

  }

  const { loading, error, data } = useQuery(GET_STUDENTS, {
    variables: {
      academicYearId: academicid,
      classId: classid
    },
    onCompleted: ({ getStudentforPickingUP }) => {
      setStudentData(getStudentforPickingUP)
    }
  });

  const { loading: sectionLoading, data: section } = useQuery(GET_SECTIONSHIFT_BY_ID, {
    variables: {
      sectionShiftId: sectionshift,
    },
    onCompleted: ({ getSectionShiftById }) => {
      setClassData(getSectionShiftById)
    },

  });

  const { loading: attendanceLoading, data: attendance } = useQuery(GET_ATTENDANCE_BY_SECTIONSHIFTID, {
    variables: {
      startDate: null,
      endDate: null,
      sectionShiftId: sectionshift,
    },
    onCompleted: ({ getAttendanceByDate }) => {
      setAttendanceList(getAttendanceByDate)
    },
    onError: (error) => {
      console.log(error.message)
    },

  });

  const handleUpdate = (e) => {

    let index = studentList.findIndex(ed => ed?.studentId === e?.studentId)

    if (index > -1) {
      studentList.splice(index, 1)

      if (e?.status !== null) {
        setStudentList([...studentList, e])
      } else {
        setStudentList([...studentList])
      }
    } else {
      setStudentList([...studentList, e])
    }

  }

  useEffect(() => {
    if (isCreate) {
      onFinish()
      setIsCreate(false)
    }
  }, [isCreate])

  return (
    <Box>
      <AttendanceHeader data={classData} setIsCreate={setIsCreate} />
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
            studentData && studentData.map(stu => {

              let status = attendanceList?.students?.find(ed => ed?.studentId?._id === stu?._id)?.status
              let remark = attendanceList?.students?.find(ed => ed?.studentId?._id === stu?._id)?.remark

              newData.push({ studentId: stu?._id, remark: remark, status: status ? status : 'PRESENT' })

              return (
                <AttendanceCard
                  data={{
                    ...stu,
                    status: status,
                    remark: remark,
                  }}
                  key={stu._id}
                  classId={classid}
                  academicYearId={academicid}
                  handleUpdate={handleUpdate} isStatus={null}
                />
              )
            }
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