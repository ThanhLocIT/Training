package com.ThanhLoc.Server.Controller;


import com.ThanhLoc.Server.ServiceEmployees.AdvancesService;
import com.ThanhLoc.Server.ServiceEmployees.EmployeesService;
import com.ThanhLoc.Server.ServiceEmployees.TeamService;
import com.ThanhLoc.Server.ServiceEmployees.WorkingService;
import com.ThanhLoc.Server.domain.Employees;
import com.ThanhLoc.Server.domain.Team;
import com.ThanhLoc.Server.payload.Request.EmployeeRequest;
import com.ThanhLoc.Server.payload.Response.EmployeeResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class HomeController {
    @Autowired()
    private EmployeesService svEmployee;
    @Autowired()
    private TeamService svTeam;
    @Autowired()
    private WorkingService svWorking;
    @Autowired()
    private AdvancesService svAdvances;

    @RequestMapping(path = "/insert_employee", method = RequestMethod.POST)
    public ResponseEntity<?> insertEmployee (@RequestBody EmployeeRequest dataEmployee){
        Team team  = svTeam.findTeamById(dataEmployee.getTeam_id());
        Employees em = new Employees();
//        //copy property from source to em
        BeanUtils.copyProperties(dataEmployee,em);
        em.setTeam(team);
        int result = svEmployee.upSertEmployee(em);
        if(result == 0){
            return ResponseEntity.ok(0);
        }
        if(result == -1){
            return ResponseEntity.ok(-1);
        }
        return ResponseEntity.ok(1);
    }

    @RequestMapping(path = "/get_employee", method = RequestMethod.GET)
    public ResponseEntity<?> fetchEmployee (@RequestParam int page, int sort){
        try {
            List<EmployeeResponse> result = svEmployee.listEmployees(page, sort);
            if(result.size() > 0){
                return ResponseEntity.ok(result);
            }
        }catch (RuntimeException e){
            return ResponseEntity.ok(-1);
        }
        return ResponseEntity.ok(-1);
    }

    @RequestMapping(path = "/get_employee_by_name", method = RequestMethod.GET)
    public ResponseEntity<?> fetchEmployeeByName (@RequestParam String name, int page, int sort){
        try {
            List<EmployeeResponse> result = svEmployee.listEmployeesByName(name, page,sort);
            if(result.size() > 0){
                return ResponseEntity.ok(result);
            }
        }catch (RuntimeException e){
            return ResponseEntity.ok(-1);
        }
        return ResponseEntity.ok(-1);
    }

    @RequestMapping(path = "/get_employee_by_id", method = RequestMethod.GET)
    public ResponseEntity<?> fetchEmployeeById (@RequestParam Long id){
        try {
            EmployeeResponse result = svEmployee.listEmployeesById(id);
                return ResponseEntity.ok(result);
        }catch (RuntimeException e){
            return ResponseEntity.ok(-1);
        }
    }
    @RequestMapping(path = "/delete_list_employee", method = RequestMethod.POST)
    public ResponseEntity<?> deleteListEmployee (@RequestBody List<Long> idEmployee){
        try {
            Boolean reasult = svEmployee.deleteListEmployees(idEmployee);
           if(reasult){
               return ResponseEntity.ok(1);
           }
        }catch (RuntimeException e){
            return ResponseEntity.ok(-1);
        }
        return ResponseEntity.ok(-1);
    }

    @RequestMapping(path = "/delete_employee", method = RequestMethod.GET)
    public ResponseEntity<?> deleteEmployee (@RequestParam Long idEmployee){
        try {
            Boolean delAdvances = svAdvances.deleteAdvancesByEmployeeId(idEmployee);
            Boolean delWorking = svWorking.deleteWorkingByEmployeeId(idEmployee);
            Boolean reasult = svEmployee.deleteEmployees(idEmployee);
            if(delAdvances){
                return ResponseEntity.ok(1);
            }
        }catch (RuntimeException e){
            return ResponseEntity.ok(-1);
        }
        return ResponseEntity.ok(-1);
    }

    @RequestMapping(path = "/get-total-employee", method = RequestMethod.GET)
    public ResponseEntity<?> fetchEmployee (){
        try {
            List<Employees> result = svEmployee.getTotalEmployee();
            if(result.size() > 0){
                return ResponseEntity.ok(result);
            }
        }catch (RuntimeException e){
            return ResponseEntity.ok(-1);
        }
        return ResponseEntity.ok(-1);
    }
    @RequestMapping(path = "/get-total-employee-by-name", method = RequestMethod.GET)
    public ResponseEntity<?> totalEmployeeByName (@RequestParam String name){
        try {
            List<Employees> result = svEmployee.getTotalEmployeeByName(name);
                return ResponseEntity.ok(result.size());
        }catch (RuntimeException e){
            return ResponseEntity.ok(-1);
        }
    }

    @RequestMapping(path = "/login", method = RequestMethod.GET)
    public ResponseEntity<?> Login (@RequestParam String phone, String passWord){
        try {
            EmployeeResponse reasult = svEmployee.Login(phone,passWord);
                return ResponseEntity.ok(reasult);
        }catch (RuntimeException e){
            return ResponseEntity.ok(-1);
        }
    }
}
