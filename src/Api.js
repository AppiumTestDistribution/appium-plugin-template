import axios from 'axios';

export async function get(url) {
    const config = {
        method: 'get',
        url,
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const response = await axios(config)
    return response.data;
}

export async function post(options) {
    const config = {
        method: 'post',
        url: options.url,
        headers: {
            'Content-Type': 'application/json'
        },
        data: options.data
    }
    console.log('====================================');
    console.log(JSON.stringify(config));
    console.log('====================================');
    const response = await axios(config)
    return response.data;
}