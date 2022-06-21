package com.ThanhLoc.Server.repository;

import com.ThanhLoc.Server.domain.Advances;
import com.ThanhLoc.Server.payload.Response.MoneyAdvancesResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RepositoryAdvances extends JpaRepository<Advances,Long> {
    @Query("SELECT " + "new com.ThanhLoc.Server.payload.Response.MoneyAdvancesResponse(b.employeeId,SUM(b.money))" + " FROM " + " Employees as a, Advances  b WHERE a.id = :id and a.id = b.employeeId  and EXTRACT(YEAR FROM b.date) = :year and EXTRACT(MONTH FROM b.date) = :month GROUP BY a.id")
    MoneyAdvancesResponse getMoneyAdvances(Long id, int month, int year);

    List<Advances> findAllByEmployeeId(Long id);

}
