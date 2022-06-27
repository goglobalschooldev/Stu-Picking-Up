import { gql } from '@apollo/client'

export const CREATE_ATTENDANCE = gql`
mutation createAttendance($newAttendance: AttendanceInput) {
  createAttendance(newAttendance: $newAttendance) {
    success
    message
  }
}
`

export const GET_ATTENDANCE_WITH_PAGINATION = gql`
query GetStudentAttendanceWithPagination($sectionShiftId: ID!, $page: Int, $limit: Int, $keyword: String, $academicYearId: ID, $startDate: Date, $endDate: Date) {
  getStudentAttendanceWithPagination(sectionShiftId: $sectionShiftId, page: $page, limit: $limit, keyword: $keyword, academicYearId: $academicYearId, startDate: $startDate, endDate: $endDate) {
    attendances {
      _id
      academicYearId {
        _id
        academicYear
      }
      attendanceDate
      sectionShiftId {
        _id
        sectionShiftName
      }
      students {
        studentId {
          _id
          firstName
          lastName
        }
        remark
        status
      }
    }
    paginator {
      slNo
      prev
      next
      perPage
      totalPosts
      totalPages
      currentPage
      hasPrevPage
      hasNextPage
      totalDocs
    }
  }
}
`

export const GET_STUDENT_ATTENDANCE_BY_MONTH = gql`
query GetStudentAttendanceByMonth($month: Int, $academicYearId: ID, $sectionShiftId: ID) {
  getStudentAttendanceByMonth(month: $month, academicYearId: $academicYearId, sectionShiftId: $sectionShiftId) {
    month
    day
    late
    present
    permission
    absent
    attendanceDate
    firstName
    lastName
    englishName
    gender
    studentId
    student
    remark
  }
}
`

export const DELETE_ATTENDANCE = gql`
mutation Mutation($attendanceId: ID!) {
  deleteAttendance(attendanceId: $attendanceId) {
    success
    message
  }
}
`
export const UPDATE_ATTENDANCE_BY_ID = gql`
mutation updateAttendance($attendanceId: ID!, $newAttendance: AttendanceInput) {
  updateAttendance(attendanceId: $attendanceId, newAttendance: $newAttendance) {
    success
    message
  }
}
`

export const GET_ATTENDANCE_BY_STUDENTID = gql`
query GetAttendanceByStudentId($studentId: ID!, $startDate: Date, $endDate: Date) {
  getAttendanceByStudentId(studentId: $studentId, startDate: $startDate, endDate: $endDate) {
    attendanceId
    attendanceDate
    studentId
    status
    remark
    academicYearId
  }
}
`

export const GET_ATTENDANCE_BY_SECTIONSHIFTID = gql`
query getAttendanceByDate($startDate: Date, $endDate: Date, $sectionShiftId: ID) {
  getAttendanceByDate(startDate: $startDate, endDate: $endDate, sectionShiftId: $sectionShiftId) {
    _id
    attendanceDate
    sectionShiftId {
      _id
      sectionShiftName
    }
    students {
      studentId {
        _id
        firstName
        lastName
      }
      remark
      status
    }
    note
  }
}
`