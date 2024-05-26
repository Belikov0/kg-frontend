import axios from 'axios'

// export const baseURL = 'http://10.151.145.53:5000'
export const baseURL = 'http://39.105.221.59:5000'

export const getCourses = async () => {
    return await axios({
        url: '/zhxh/courses',
        method: 'get',
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((res) => res.data)
}

export const getData = async (id: string) => {
    return await axios({
        url: `/zhxh/course?id=${id}`,
        method: 'get',
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((res) => res.data)
}

export const getDataByArbitraryId = async (id: string) => {
    return await axios.get(baseURL + `/zhxh/node?id=${id}`).then((res) => res.data)
}

interface PrecourseReq {
    major: string
    time: string
    course: string
}

interface PathReq {
    major: string
    time: string
    course: string
    precourse: Array<String>
}

export const getPrecourse = async (precourseReq: PrecourseReq) => {
    return await axios({
        url: '/zhxh/precourse',
        method: 'post',
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        data: precourseReq
    }).then((res) => res.data)
}

export const getPath = async (pathReq: PathReq) => {
    return await axios({
        url: '/zhxh/path',
        method: 'post',
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        data: pathReq
    }).then((res) => res.data)
}

interface Text {
    text: string
}

export const getAnswer = async (text: any) => {
    return await axios({
        url: '/zhxh/question',
        method: 'post',
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        data: text
    })
}
