import axios from 'axios';

export async function get(options) {
    const config = {
        method: 'get',
        url: options.url,
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const response = await axios.get(config)
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

    const response = await axios.post(config)
    return response.data;
}