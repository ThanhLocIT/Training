package com.ThanhLoc.Server.repository;

import com.ThanhLoc.Server.domain.Advances;
import com.ThanhLoc.Server.domain.Working;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RepositoryAdvances extends JpaRepository<Advances,Long> {
    List<Advances> findAllByEmployeeId(Long id);

}
