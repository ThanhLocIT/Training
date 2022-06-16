package com.ThanhLoc.Server.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Advances {
    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false)
    private Long employeeId;
    private LocalDate date;
    private Long money;

}
