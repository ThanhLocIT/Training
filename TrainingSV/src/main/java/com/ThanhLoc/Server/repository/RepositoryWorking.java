package com.ThanhLoc.Server.repository;

import com.ThanhLoc.Server.domain.Working;
import com.ThanhLoc.Server.payload.Response.HourWorkingResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepositoryWorking  extends JpaRepository<Working,Long> {
@Query("SELECT " + "new com.ThanhLoc.Server.payload.Response.HourWorkingResponse(b.employeeId,a.money,SUM(b.hour))" + " FROM " + " Employees as a, Working  b WHERE a.id = :id and a.id = b.employeeId and b.status = 1 and EXTRACT(YEAR FROM b.date) = :year and EXTRACT(MONTH FROM b.date) = :month GROUP BY a.id")

HourWorkingResponse getHourWorking(Long id, int month, int year);
    List<Working> findAllByEmployeeId(Long id);

}
