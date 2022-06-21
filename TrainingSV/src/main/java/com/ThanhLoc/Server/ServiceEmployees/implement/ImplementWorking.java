package com.ThanhLoc.Server.ServiceEmployees.implement;

import com.ThanhLoc.Server.ServiceEmployees.WorkingService;
import com.ThanhLoc.Server.domain.Working;
import com.ThanhLoc.Server.payload.Response.HourWorkingResponse;
import com.ThanhLoc.Server.repository.RepositoryWorking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ImplementWorking implements WorkingService {
    @Autowired
    private RepositoryWorking reWorking;

    @Override
    public boolean insertWorking(Working working){
        try {
            reWorking.save(working);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    @Override
    public List<Working> listWorking(Long id) throws RuntimeException{
        Sort sort = Sort.by("id");
        try {
            List<Working> list = new ArrayList<>();
            //Pageable domain
            list = reWorking.findAllByEmployeeId(id);
            return list;
        }catch(Exception e){
            throw new RuntimeException();
        }
    }

    @Override
    public boolean deleteWorking(Long idWorking) throws RuntimeException{
        try {
            reWorking.deleteById(idWorking);
            return true;
        }catch(Exception e){
            throw new RuntimeException();
        }
    }

    @Override
    public boolean deleteWorkingByEmployeeId(Long idEmployee) throws RuntimeException{
        try {
            List<Working> list = new ArrayList<>();
            list = reWorking.findAllByEmployeeId(idEmployee);
            reWorking.deleteAll(list);
            return true;
        }catch(Exception e){
            throw new RuntimeException();
        }
    }

    @Override
    public HourWorkingResponse getHourWorking(Long id, int month, int year) throws RuntimeException {
        try {
            HourWorkingResponse hour = new HourWorkingResponse();
            hour = reWorking.getHourWorking(id,month,year);
            return hour;
        }catch(Exception e){
            throw new RuntimeException();
        }
    }

}
