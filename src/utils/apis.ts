import axios from 'axios'


const getData = async () => {
    return await axios
        .get('http://10.151.96.251:5000/zhxh/course')
        .then(res => res.data)
    
}