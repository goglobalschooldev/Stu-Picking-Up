import { gql } from "@apollo/client"

export const GET_CLASS_BY_ID = gql`
    query getClassesById($classId: ID) {
        getClassesById(classId: $classId) {
        _id
        className
        students {
            student {
            _id
            firstName
            lastName
            englishName
            }
        }
        classGroupId {
            _id
            classGroupName
            programId {
            _id
            programmName
            }
        }
        gradeId {
            _id
            gradeName
        }
        }
    }
`