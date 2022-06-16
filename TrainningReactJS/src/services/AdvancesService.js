import axios from '../axios';

const getInforAdvancesByEmployee = (id) => {
    return axios.get(`/get_advances?idEmployee=${id}`);
}

const delAdvancesById = (id) => {
    return axios.get(`/delete_advances?idAdvances=${id}`);
}

const insertAdvances = (data) => {
    console.log(data)
    return axios.post(`/insert_advances`, data);
}


export {
    getInforAdvancesByEmployee,
    delAdvancesById,
    insertAdvances
}