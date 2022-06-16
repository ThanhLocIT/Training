package com.ThanhLoc.Server.payload.Request;

import com.ThanhLoc.Server.domain.Employees;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeamRequest {
    private  Long id;
    private String name;
}
