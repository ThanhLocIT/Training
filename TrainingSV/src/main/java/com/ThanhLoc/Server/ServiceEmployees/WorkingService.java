package com.ThanhLoc.Server.ServiceEmployees;

import com.ThanhLoc.Server.domain.Working;
import com.ThanhLoc.Server.payload.Response.HourWorkingResponse;

import java.util.List;

public interface WorkingService {
    boolean insertWorking(Working working);

    List<Working> listWorking(Long id) throws RuntimeException;

    boolean deleteWorking(Long idWorking) throws RuntimeException;

    boolean deleteWorkingByEmployeeId(Long idEmployee) throws RuntimeException;

    HourWorkingResponse getHourWorking(Long id, int month, int year) throws RuntimeException;

    int approvalWorking(Long id);
}
