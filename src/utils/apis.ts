import axios from 'axios'

export const getCourses = async () => {
    return await axios.get('http://192.168.162.24:5000/zhxh/courses').then((res) => res.data)
}

export const getData = async (id: string) => {
    return await axios
        .get(`http://192.168.162.24:5000/zhxh/course?id=${id}`)
        .then((res) => res.data)
}
