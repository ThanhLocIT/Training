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
public class Working {
    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false)
    private Long employeeId;
    private LocalDate date;
    private Long hour;
    private int status;
}
