package com.ThanhLoc.Server.ServiceEmployees.implement;

import com.ThanhLoc.Server.ServiceEmployees.EmployeesService;
import com.ThanhLoc.Server.domain.Advances;
import com.ThanhLoc.Server.domain.Employees;
import com.ThanhLoc.Server.domain.Working;
import com.ThanhLoc.Server.payload.Response.EmployeeResponse;
import com.ThanhLoc.Server.repository.RepositoryAdvances;
import com.ThanhLoc.Server.repository.RepositoryEmployees;
//import com.ThanhLoc.Server.repository.RepositoryTeam;
import com.ThanhLoc.Server.repository.RepositoryWorking;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ImplementEmployeesService implements EmployeesService {
    @Autowired
    private RepositoryEmployees reEmployee;
    private RepositoryAdvances reAdvances;
    private RepositoryWorking reWorking;

    @Override
    public boolean upSertEmployee(Employees employees) {
        try {
            Employees employees1 = new Employees();
            if(employees.getId() != null){
                employees1.setId(employees.getId());
                employees1.setFullName(employees.getFullName());
                employees1.setAge(employees.getAge());
                employees1.setTeam(employees.getTeam());
                employees1.setAddress(employees.getAddress());
                employees1.setDay(employees.getDay());
                employees1.setMoney(employees.getMoney());
                employees1.setPhone(employees.getPhone());
                employees1.setImage(employees.getImage());
                employees1.setSex(employees.getSex());
                reEmployee.save(employees1);
            }else{
                reEmployee.save(employees);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<EmployeeResponse> listEmployees(int pageTotal) throws RuntimeException {
        Sort sort = Sort.by(Sort.Direction.DESC,"id");
        int size = 6;
        try {
            List<EmployeeResponse> list = new ArrayList<>();
            //Pageable domain
            Pageable page = PageRequest.of(pageTotal - 1, size, sort);
            Page<Employees> res = reEmployee.findAll(page);
            if (res != null & res.getSize() > 0)
                for (Employees employee : res.getContent()) {
                    EmployeeResponse employeeResponse = new EmployeeResponse();
                    BeanUtils.copyProperties(employee, employeeResponse);
                    employeeResponse.setTeam_id(employee.getTeam().getId());
                    employeeResponse.setTeamName(employee.getTeam().getName());
                    list.add(employeeResponse);
                }
            return list;
        } catch (Exception e) {
            throw new RuntimeException();
        }
    }

    @Override
    public List<EmployeeResponse> listEmployeesByName(String name, int pageTotal) throws RuntimeException {
        Sort sort = Sort.by("id");
        int size = 6;
        try {
            List<EmployeeResponse> list = new ArrayList<>();
            //Pageable domain
            Pageable page = PageRequest.of(pageTotal - 1, size, sort);
            Page<Employees> res = reEmployee.findAllByFullName(name, page);
            if (res != null & res.getSize() > 0)
                for (Employees employee : res.getContent()) {
                    EmployeeResponse employeeResponse = new EmployeeResponse();
                    BeanUtils.copyProperties(employee, employeeResponse);
                    employeeResponse.setTeam_id(employee.getTeam().getId());
                    employeeResponse.setTeamName(employee.getTeam().getName());
                    list.add(employeeResponse);
                }
            return list;
        } catch (Exception e) {
            throw new RuntimeException();
        }
    }

    @Override
    public EmployeeResponse listEmployeesById(Long id) throws RuntimeException {
        int size = 6;
        try {
            //Pageable domain
            Employees res = reEmployee.findById(id).orElse(null);
            EmployeeResponse employeeResponse = new EmployeeResponse();
            if (res != null){
                BeanUtils.copyProperties(res, employeeResponse);
                employeeResponse.setTeam_id(res.getTeam().getId());
                employeeResponse.setTeamName(res.getTeam().getName());
            }
            return employeeResponse;
        } catch (Exception e) {
            throw new RuntimeException();
        }
    }

    @Override
    public boolean deleteListEmployees(List<Long> idEmployee) throws RuntimeException {
        try {

            List<Employees> listEmployee = new ArrayList<>();
            idEmployee.forEach(id -> {
                Employees result = reEmployee.findById(id).get();
                listEmployee.add(result);
            });
                reEmployee.deleteAll(listEmployee);
            return true;
        } catch (Exception e) {
            throw new RuntimeException();

        }
    }

    @Override
    public boolean deleteEmployees(long idEmployee) throws RuntimeException {
        try {
            reEmployee.deleteById(idEmployee);
            return true;
        } catch (Exception e) {
            throw new RuntimeException();
        }

    }

    @Override
    public List<Employees> getTotalEmployee() throws RuntimeException {
        try {
            List<Employees> list = new ArrayList<>();
            list = reEmployee.findAll();
            return list;
        } catch (Exception e) {
            throw new RuntimeException();
        }
    }

}
