import axios from 'axios';
import { URL } from './env';
//import { IActivity, ITrx, utils } from 'rum-sdk-browser';
//import store from 'store2';


async function sendContent(content: string) {
    const payload = { title: 'incoming!', data:content };
    await axios.post(`${URL}/trx`, payload)
    .then((res)=>{
        console.log(`here is response:${res}`)
    })
};


export default sendContent