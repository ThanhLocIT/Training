package com.ThanhLoc.Server.ServiceEmployees;

import com.ThanhLoc.Server.domain.Working;

import java.util.List;

public interface WorkingService {
    boolean insertWorking(Working working);

    List<Working> listWorking(Long id) throws RuntimeException;

    boolean deleteWorking(Long idWorking) throws RuntimeException;

    boolean deleteWorkingByEmployeeId(Long idEmployee) throws RuntimeException;
}
