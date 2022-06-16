package com.ThanhLoc.Server.ServiceEmployees;

import com.ThanhLoc.Server.domain.Team;

import java.util.List;
import java.util.Map;

public interface TeamService {
    Map<String, Object> listTeam();

    boolean insertTeam(Team team);

    Map<String, Object> listEmployeeOfTeam(Long id);

    Team findTeamById(Long id) throws RuntimeException;
}
