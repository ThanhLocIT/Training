package com.ThanhLoc.Server.repository;

import com.ThanhLoc.Server.domain.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryTeam extends JpaRepository<Team,Long> {

}
