import request from './request';

request([
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod'
], {
    method: 'GET',
    timeout: 2000,  
    data: { api_key: 'DEMO_KEY', date: '2018-09-17' }
}).then(res => {
    console.info(res)
}).catch(error => {
    console.info(error)
})