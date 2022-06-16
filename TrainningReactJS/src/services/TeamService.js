import axios from '../axios';

const getTeamService = () => {
    return axios.get(`/get_team`);
}

const getEmployeeOfTeamService = (id) => {
    return axios.get(`/get-employee-of-team?id=${id}`);
}

const insertTeamService = (data) => {
    return axios.post(`/insert_team`, data);
}


export {
    getTeamService,
    getEmployeeOfTeamService,
    insertTeamService
}