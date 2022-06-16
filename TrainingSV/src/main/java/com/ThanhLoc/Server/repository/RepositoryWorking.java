package com.ThanhLoc.Server.repository;

import com.ThanhLoc.Server.domain.Employees;
import com.ThanhLoc.Server.domain.Working;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepositoryWorking  extends JpaRepository<Working,Long> {
    List<Working> findAllByEmployeeId(Long id);

}
