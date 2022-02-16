import { gql } from '@apollo/client'

export const GET_SECTIONSHIFT_BY_TEACHER_ID = gql`
query GetSectionShiftByTeacherId($personalInfoId: ID) {
getSectionShiftByTeacherId(personalInfoId: $personalInfoId) {
    _id
    sectionShiftName
    schoolId {
      _id
      schoolName
    }
    academicYearId {
      _id
      academicYear
    }
    shiftId {
      _id
      shiftName
    }
    programId {
      _id
      programmName
    }
    classId {
      _id
      className
      gradeId {
        _id
        gradeName
      }
    }
    sectionTypeId {
      _id
      sectionTypeName
    }
    sections {
      _id
      startTime
      endTime
      breakTime
      dayOfWeek
      classroomId {
        _id
        classroomName
      }
      leadTeacherId {
        _id
        firstName
        lastName
      }
      duration

      teacherAssistantId {
        _id
        firstName
        lastName
      }
        subjectName
        subjectId {
          _id
          subjectName
        }
    }
  }
}
`

export const GET_SECTIONSHIFT_BY_ID = gql`
query GetSectionShiftById($sectionShiftId: ID!) {
  getSectionShiftById(sectionShiftId: $sectionShiftId) {
    _id
    sectionShiftName
    schoolId {
      _id
    _id
      schoolName
    }
    academicYearId {
      _id
      academicYear
      status
    }
    shiftId {
      _id
      shiftName
    }
    programId {
      _id
      programmName
    }
    
  }
}
`