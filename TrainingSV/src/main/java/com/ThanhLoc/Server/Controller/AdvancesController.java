package com.ThanhLoc.Server.Controller;

import com.ThanhLoc.Server.ServiceEmployees.AdvancesService;
import com.ThanhLoc.Server.domain.Advances;
import com.ThanhLoc.Server.payload.Request.AdvancesRequest;
import com.ThanhLoc.Server.payload.Response.MoneyAdvancesResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdvancesController {
    @Autowired
    private AdvancesService svAdvances;
    @RequestMapping(path = "/get_advances", method = RequestMethod.GET)
    public ResponseEntity<?> fetchAdvances (@RequestParam Long idEmployee){
        return ResponseEntity.ok(svAdvances.listAdvances(idEmployee));
    }

    @RequestMapping(path = "/insert_advances", method = RequestMethod.POST)
    public ResponseEntity<?> insertWorking (@RequestBody AdvancesRequest dataAdvances){
        Advances advances = new Advances();
//        //copy property from source to em
        BeanUtils.copyProperties(dataAdvances,advances);
        boolean result = svAdvances.insertAdvances(advances);
        if(result){
            return ResponseEntity.ok(0);
        }
        return ResponseEntity.ok(-1);
    }

    @RequestMapping(path = "/delete_advances", method = RequestMethod.GET)
    public ResponseEntity<?> deleteWorking (@RequestParam Long idAdvances){
        try {
            Boolean reasult = svAdvances.deleteAdvances(idAdvances);
            if(reasult){
                return ResponseEntity.ok(1);
            }
        }catch (RuntimeException e){
            return ResponseEntity.ok(-1);
        }
        return ResponseEntity.ok(-1);
    }

    @RequestMapping(path = "/get_money_advances", method = RequestMethod.GET)
    public ResponseEntity<?> getMoneyAdvances (@RequestParam Long id, int month, int year){
        MoneyAdvancesResponse a = new MoneyAdvancesResponse();
        a = svAdvances.getMoneyAdvances(id, month, year);
        return ResponseEntity.ok(a);
    }
}
