package com.ThanhLoc.Server.Controller;

import com.ThanhLoc.Server.ServiceEmployees.WorkingService;
import com.ThanhLoc.Server.domain.Working;
import com.ThanhLoc.Server.payload.Request.WorkingRequest;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class WorkingController {
    @Autowired
    private WorkingService svWorking;
    @RequestMapping(path = "/get_working", method = RequestMethod.GET)
    public ResponseEntity<?> fetchWorking (@RequestParam Long idEmployee){
        return ResponseEntity.ok(svWorking.listWorking(idEmployee));
    }

    @RequestMapping(path = "/insert_working", method = RequestMethod.POST)
    public ResponseEntity<?> insertWorking (@RequestBody WorkingRequest dataWorking){
        Working working = new Working();
//        //copy property from source to em
        BeanUtils.copyProperties(dataWorking,working);
        boolean result = svWorking.insertWorking(working);
        if(result){
            return ResponseEntity.ok(0);
        }
        return ResponseEntity.ok(-1);
    }

    @RequestMapping(path = "/delete_working", method = RequestMethod.GET)
    public ResponseEntity<?> deleteWorking (@RequestParam Long idWorking){
        try {
            Boolean reasult = svWorking.deleteWorking(idWorking);
            if(reasult){
                return ResponseEntity.ok(1);
            }
        }catch (RuntimeException e){
            return ResponseEntity.ok(-1);
        }
        return ResponseEntity.ok(-1);
    }
}
