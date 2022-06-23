package com.ThanhLoc.Server.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Employees {
    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false)
    private String fullName;
    private String passWord;
    private String address;
    private String sex;
    private int age;
    private LocalDate day;
    private int money;
    private String phone;
    private  String role;
    @ManyToOne
    private Team team;
    private  String image;

}