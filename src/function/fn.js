import { InMemoryCache } from "@apollo/client";
import moment from "moment"

export const cache = new InMemoryCache()

export function randomColor(index){
    const colors = [
        '#00A2D1',
        '#13DAA9',
        '#9AED86',
        '#F9F871',
        '#716FC1',
        '#9162B6',
        '#AC54A3',
        '#BF458A',
        '#D6F4FF',
        '#E29E21',
        '#63B6FB',
        '#FFECCB',
        '#E29E21',
        '#8A7356',
        '#B95C84',
        '#D4EDEA',
        '#2D8981',
        '#9D7333',
        '#009176',
        '#C35C43',
        '#00D5D6',
        '#298C3D',
        '#EEE8A9',
        '#E29E21',
        '#E6F4F1',
        '#5DB0F5',
    ]

    return colors[index]
}

export function joinTwoArray(array1, array2, array3) {

    let x = array1
    let y = array2

    let r = []
    x?.map(record => {

        if (y?.map(e => e.studentId).includes(record.studentId)) {
            record = { ...record, ...y.filter(e => e.studentId === record.studentId)[0] }
        }

        // record = {...record}
        r.push(record)
    })

    y?.map(record => {
        if (!r?.map(e => e.studentId).includes(record.studentId) && y?.map(e => e.studentId).includes(record.studentId)) {
            r.push({ ...record })
        }
    })

    return r
}

export const getUserLoggedID = () => {
    let data = JSON.parse(localStorage.getItem('user_logged'))

    return data?.id || null
}

export function getKhmerNumber(number) {

  let numArr = number?.toString()?.split('')

  let numberKh = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩']
  let newArr = []

  for (let i = 0; i < numArr?.length; i++) {
      //   if(d < 10){
      //     newArr.push(numberKh[0])
      //   }
      newArr.push(numberKh[numArr[i]])
      //   if(i===numArr.length-1){
      //     newArr.push(newArr.join(""))
      //   }
  }
  return newArr?.join("")
}

export const convertToPrintData = (data) => {

    let dataExcel = []

    data?.map(student => {
        let attendance = ''
        let day = "day" + student?.day

        let result = {
            fullName: student?.lastName + ' ' + student?.firstName,
            englishName: student?.englishName,
            gender: student?.gender,
            studentId: student?.studentId,
            student: student?.student,
            remark: student?.remark
        }

        if (student?.absent === 1) {
            attendance = 'A'
        } else if (student?.permission === 1) {
            attendance = 'P'
        } else if (student?.late === 1) {
            attendance = 'L'
        } else {
            attendance = '1'
        }

        result[day] = attendance

        dataExcel.push(result)
    })

    let combined = dataExcel.reduce((a, v) => {
        if (a[v.student]) {
            a[v.student] = { ...a[v.student], ...v }
        } else {
            a[v.student] = v
        }
        return a
    }, {})
    return Object.values(combined)
}

export function getDaysInMonthUTC(month, year) {
    var date = new Date(Date.UTC(year, month, 1));
    var days = [];
    while (date.getUTCMonth() === month) {
        days.push(moment(new Date(date)).format('DD'));
        date.setUTCDate(date.getUTCDate() + 1);
    }
    return days;
}