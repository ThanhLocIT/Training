import axios from '../axios';

const getInforWorkingByEmployee = (id) => {
    return axios.get(`/get_working?idEmployee=${id}`);
}

const delWorkingById = (id) => {
    return axios.get(`/delete_working?idWorking=${id}`);
}

const insertWorking = (data) => {
    return axios.post(`/insert_working`, data);
}


export {
    getInforWorkingByEmployee,
    delWorkingById,
    insertWorking
}