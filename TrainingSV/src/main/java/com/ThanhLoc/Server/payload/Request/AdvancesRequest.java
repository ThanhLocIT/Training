package com.ThanhLoc.Server.payload.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdvancesRequest {
    private Long id;
    private Long employeeId;
    private LocalDate date;
    private Long money;

}
