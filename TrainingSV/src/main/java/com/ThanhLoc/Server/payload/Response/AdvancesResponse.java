package com.ThanhLoc.Server.payload.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdvancesResponse {
    private Long id;
    private Long employeeId;
    private LocalDate date;
    private Long money;
    private int status;
}
