package com.ThanhLoc.Server.repository;

import com.ThanhLoc.Server.domain.Employees;
import com.ThanhLoc.Server.domain.Team;
import com.ThanhLoc.Server.payload.Response.EmployeeResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RepositoryEmployees extends JpaRepository<Employees,Long> {
    @Query("SELECT e FROM Employees as e where e.fullName LIKE %:fullName%")
    Page<Employees> findAllByFullName(String fullName, Pageable page);

    @Query("SELECT e, t.name as teamName FROM Employees as e, Team as t where e.team = t.id")
    Page<EmployeeResponse> findAllEmployy(Pageable page);

    @Query("SELECT e FROM Employees as e where e.phone = :phone and passWord = :passWord")
    Employees Login(String phone, String passWord);
    List<Employees> findAllByTeam(Team team);
    Employees findAllByPhone(String phone);
    @Query("SELECT e FROM Employees as e where e.fullName LIKE %:fullName%")
    List<Employees> findAllByFullName(String fullName);
}
