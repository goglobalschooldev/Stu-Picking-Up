import { gql } from "@apollo/client";
export const GET_STUDENTS = gql`
    query GetStudentforPickingUP($academicYearId: ID, $classId: ID) {
        getStudentforPickingUP(academicYearId: $academicYearId, classId: $classId) {
            _id
            englishName
            transportation
            profileImg
        }
    }
`
export const STU_SUBCRIPTION = gql`
    subscription Subscription($studentId: ID) {
    pickingUpFilter(studentId: $studentId) {
        studentId {
        _id
        }
        picked
    }
    }
`

export const GET_STUDENTPICKUP = gql`
query GetStudentPickupBystudentIdClassIdAndDate( $studentId: ID, $date: Date) {
  getStudentPickupBystudentIdClassIdAndDate( studentId: $studentId, date: $date) {
    studentId {
      _id
    }
    studentName
    transportation
    picked
    pickingUpAt
    leftAt
  }
}
`