package com.ThanhLoc.Server.Controller;

import com.ThanhLoc.Server.ServiceEmployees.TeamService;
import com.ThanhLoc.Server.domain.Employees;
import com.ThanhLoc.Server.domain.Team;
import com.ThanhLoc.Server.payload.Request.TeamRequest;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TeamController {
    @Autowired()
    private TeamService svTeam;
    @RequestMapping(path = "/get_team", method = RequestMethod.GET)
    public ResponseEntity<Map<String, Object>> fetchTeam (){
        return ResponseEntity.ok(svTeam.listTeam());
    }

    @RequestMapping(path = "/insert_team", method = RequestMethod.POST)
    public ResponseEntity<?> insertTeam (@RequestBody TeamRequest dataTeam){
        Team team = new Team();
        BeanUtils.copyProperties(dataTeam,team);
        boolean result = svTeam.insertTeam(team);
        if(result){
            return ResponseEntity.ok(0);
        }
        return ResponseEntity.ok(-1);
    }

    @RequestMapping(path = "/get-employee-of-team", method = RequestMethod.GET)
    public ResponseEntity<Map<String, Object>> fetchEmployeeOfTeam (@RequestParam Long id){
        return ResponseEntity.ok(svTeam.listEmployeeOfTeam(id));
    }

}
