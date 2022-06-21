import axios from '../axios';

const getHourWorking = (id, month, year) => {
    return axios.get(`/get_hour_working?id=${id}&month=${month}&year=${year}`);
}

const getMoneyAdvances = (id, month, year) => {
    return axios.get(`/get_money_advances?id=${id}&month=${month}&year=${year}`);
}


export {
    getHourWorking,
    getMoneyAdvances
}