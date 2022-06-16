import axios from '../axios';

const getEmployeeService = (data) => {
    return axios.get(`/get_employee?page=${data}`);
}

const getEmployeeByNameService = (name, page) => {
    return axios.get(`/get_employee_by_name?name=${name}&page=${page}`);
}

const getInforEmployeeService = (data) => {
    return axios.get(`/get-total-employee`);
}

const getInforEmployeeServiceById = (id) => {
    return axios.get(`/get_employee_by_id?id=${id}`);
}


const DelEmployeeService = (id) => {
    return axios.get(`/delete_employee?idEmployee=${id}`);
}

const DelListEmployeeService = (listId) => {
    return axios.post(`/delete_list_employee`, listId);
}

const upSertEmployeeService = (data) => {
    return axios.post(`/insert_employee`, data);
}

const uploadImage = (file) => {
    return axios.post(`/upload-file`, file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export {
    getEmployeeService,
    getEmployeeByNameService,
    DelEmployeeService,
    getInforEmployeeService,
    upSertEmployeeService,
    DelListEmployeeService,
    uploadImage,
    getInforEmployeeServiceById
}