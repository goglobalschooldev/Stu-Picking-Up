import { InMemoryCache } from "@apollo/client";

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