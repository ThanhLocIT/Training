package com.ThanhLoc.Server.ServiceEmployees.implement;

import com.ThanhLoc.Server.ServiceEmployees.AdvancesService;
import com.ThanhLoc.Server.domain.Advances;
import com.ThanhLoc.Server.payload.Response.MoneyAdvancesResponse;
import com.ThanhLoc.Server.repository.RepositoryAdvances;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ImplementAdvances implements AdvancesService {
    @Autowired
    private RepositoryAdvances reAdvances;
    @Override
    public boolean insertAdvances(Advances advances){
        try {
            reAdvances.save(advances);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    @Override
    public List<Advances> listAdvances(Long id) throws RuntimeException{
        Sort sort = Sort.by("id");
        try {
            List<Advances> list = new ArrayList<>();
            list = reAdvances.findAllByEmployeeId(id);
            return list;
        }catch(Exception e){
            throw new RuntimeException();
        }
    }

    @Override
    public boolean deleteAdvances(Long idAdvances) throws RuntimeException{
        try {
            reAdvances.deleteById(idAdvances);
            return true;
        }catch(Exception e){
            throw new RuntimeException();
        }
    }

    @Override
    public boolean deleteAdvancesByEmployeeId(Long idEmployee) throws RuntimeException{
        try {
            List<Advances> list = new ArrayList<>();
            list = reAdvances.findAllByEmployeeId(idEmployee);
            reAdvances.deleteAll(list);
            return true;
        }catch(Exception e){
            throw new RuntimeException();
        }
    }

    @Override
    public MoneyAdvancesResponse getMoneyAdvances(Long id, int month, int year) throws RuntimeException {
        try {
            MoneyAdvancesResponse ad = new MoneyAdvancesResponse();
            ad = reAdvances.getMoneyAdvances(id,month,year);
            return ad;
        }catch(Exception e){
            throw new RuntimeException();
        }
    }

    @Override
    public int approvalAdvance(Long id) {
        try {
            Optional<Advances> res = reAdvances.findById(id);
            Advances advances1 = new Advances();
                if (res != null ) {
                    advances1.setId(res.get().getId());
                    advances1.setEmployeeId(res.get().getEmployeeId());
                    advances1.setDate(res.get().getDate());
                    advances1.setMoney(res.get().getMoney());
                    advances1.setStatus(1);
                    reAdvances.save(advances1);
                }else{
                    return 1;
                }
            return 0;
        } catch (Exception e) {
            return -1;
        }
    }
}
