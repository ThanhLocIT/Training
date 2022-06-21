package com.ThanhLoc.Server.payload.Response;
        import lombok.AllArgsConstructor;
        import lombok.Data;
        import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MoneyAdvancesResponse {
    private Long employeeId;
    private Long money;
}
