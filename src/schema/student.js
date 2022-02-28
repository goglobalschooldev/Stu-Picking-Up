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
query getStudentPickupBystudentIdClassIdAndDate( $studentId: ID, $date: Date,$classId: ID) {
  getStudentPickupBystudentIdClassIdAndDate( studentId: $studentId, date: $date,classId: $classId) {
    id
    studentId {
      _id
    }
    studentName
    transportation
    picked
    pickingUpAt
    leftAt
    createdAt
    classId{
      _id
    }
    shift {
      _id
      shiftName
    }
    academicYearId {
      _id
      academicYear
    }
  }
}
`

export const UPDATE_STUDENTPICKUP = gql`
mutation UpdatePickingUp($newPickingUp: PickingUpInput, $pickingUpId: ID) {
  updatePickingUp(newPickingUp: $newPickingUp, pickingUpId: $pickingUpId) {
    success
    message
  }
}
`
export const CREATE_PICKUP = gql`
mutation createPickingUp($newPickingUp: PickingUpInput) {
    createPickingUp(newPickingUp: $newPickingUp) {
        message
        success
    }
}
`