package com.ThanhLoc.Server.ServiceEmployees;

import com.ThanhLoc.Server.domain.Advances;
import com.ThanhLoc.Server.domain.Working;

import java.util.List;

public interface AdvancesService  {
    boolean insertAdvances(Advances advances);
    List<Advances> listAdvances(Long id) throws RuntimeException;

    boolean deleteAdvances(Long idAdvances) throws RuntimeException;


    boolean deleteAdvancesByEmployeeId(Long idEmployee) throws RuntimeException;
}