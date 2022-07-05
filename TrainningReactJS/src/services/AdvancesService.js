import axios from '../axios';

const getInforAdvancesByEmployee = (id) => {
    return axios.get(`/get_advances?idEmployee=${id}`);
}

const delAdvancesById = (id) => {
    return axios.get(`/delete_advances?idAdvances=${id}`);
}

const insertAdvances = (data) => {
    return axios.post(`/insert_advances`, data);
}

const approvalAdvance = (id) => {
    console.log(id)
    return axios.get(`/approval_advance?id=${id}`);
}


export {
    getInforAdvancesByEmployee,
    delAdvancesById,
    insertAdvances,
    approvalAdvance
}