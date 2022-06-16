package com.ThanhLoc.Server.payload.Response;

import com.ThanhLoc.Server.domain.Employees;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeamResponse {
    private  Long id;
    private String name;
    private List<Employees> employees;
}
