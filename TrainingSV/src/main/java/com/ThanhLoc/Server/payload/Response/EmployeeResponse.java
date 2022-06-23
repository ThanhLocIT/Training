package com.ThanhLoc.Server.payload.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeResponse {
    private  Long id;
    private String fullName;
    private String passWord;
    private String address;
    private String sex;
    private int age;
    private LocalDate day;
    private int money;
    private String phone;
    private  String role;
    private Long team_id;
    private String image;
    private String teamName;

}
