package com.ThanhLoc.Server.payload.Response;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HourWorkingResponse {
    private Long employeeId;
    private int money;
    private Long hour;
}
