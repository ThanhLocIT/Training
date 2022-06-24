import axios from '../axios';

const getEmployeeService = (data, sort) => {
    return axios.get(`/get_employee?page=${data}&sort=${sort}`);
}

const getEmployeeByNameService = (name, page, sort) => {
    return axios.get(`/get_employee_by_name?name=${name}&page=${page}&sort=${sort}`);
}

const getInforEmployeeService = (data) => {
    return axios.get(`/get-total-employee`);
}

const totalEmployeeByNameService = (name) => {
    return axios.get(`get-total-employee-by-name?name=${name}`);
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

const login = (phone, passWord) => {
    return axios.get(`/login?phone=${phone}&passWord=${passWord}`);
}

export {
    getEmployeeService,
    getEmployeeByNameService,
    DelEmployeeService,
    getInforEmployeeService,
    upSertEmployeeService,
    DelListEmployeeService,
    uploadImage,
    getInforEmployeeServiceById,
    login,
    totalEmployeeByNameService
}