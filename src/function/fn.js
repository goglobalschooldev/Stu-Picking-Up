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