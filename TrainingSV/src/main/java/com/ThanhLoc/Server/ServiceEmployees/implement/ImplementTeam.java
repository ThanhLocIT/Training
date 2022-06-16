package com.ThanhLoc.Server.ServiceEmployees.implement;


import com.ThanhLoc.Server.ServiceEmployees.TeamService;
import com.ThanhLoc.Server.domain.Employees;
import com.ThanhLoc.Server.domain.Team;
import com.ThanhLoc.Server.payload.Response.TeamResponse;
import com.ThanhLoc.Server.repository.RepositoryEmployees;
import com.ThanhLoc.Server.repository.RepositoryTeam;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ImplementTeam implements TeamService {
    @Autowired
    private RepositoryTeam reTeam;
    @Autowired
    RepositoryEmployees reEmployee;
    @Override
    public  Map<String, Object> listTeam() throws RuntimeException{
        Map<String, Object> response = new HashMap<>();
        try {
            List<TeamResponse> list = new ArrayList<>();
            List<Team> res = reTeam.findAll();
            Long totalItem =  reTeam.count();
            if(res != null & res.size() > 0) {
                for (Team re : res) {
                    List<Employees> employee = reEmployee.findAllByTeam(re);
                    TeamResponse team = new TeamResponse();
                    BeanUtils.copyProperties(re, team);
                    team.setEmployees(employee);
                    list.add(team);
                }
            }
            response.put("listTeam", list);
            response.put("totalItem",totalItem);
            return response;
        }catch(Exception e){
            throw new RuntimeException();
        }
    }

    @Override
    public boolean insertTeam(Team team){
        try {
            reTeam.save(team);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    @Override
    public Map<String, Object>  listEmployeeOfTeam(Long id) throws RuntimeException{
        Map<String, Object> response = new HashMap<>();
        try {
            //Pageable domain
            Optional<Team> team = reTeam.findById(id);
            List<Employees> employee = reEmployee.findAllByTeam(team.get());
            Long totalItem = Long.valueOf(employee.size());
            response.put("listEmployee", employee);
            response.put("totalItem",totalItem);
            return response;
        }catch(Exception e){
            throw new RuntimeException();
        }
    }

    @Override
    public Team findTeamById(Long id) throws RuntimeException{
        try {
            //Pageable domain
            Optional<Team> team = reTeam.findById(id);
            System.out.println(team.get());
            return team.get();
        }catch(Exception e){
            throw new RuntimeException();
        }
    }

}
