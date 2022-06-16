package com.ThanhLoc.Server.ServiceEmployees;

import com.ThanhLoc.Server.domain.Employees;
import com.ThanhLoc.Server.payload.Response.EmployeeResponse;

import java.util.List;

public interface EmployeesService {
    boolean upSertEmployee (Employees employees);
    List<EmployeeResponse> listEmployees(int page);
    List<EmployeeResponse> listEmployeesByName(String name, int page);
    List<Employees> getTotalEmployee();
    boolean deleteEmployees(long idEmployee) throws RuntimeException;

    EmployeeResponse listEmployeesById(Long id) throws RuntimeException;

    boolean deleteListEmployees(List<Long> idEmployee) throws RuntimeException;
}
