package com.probeco.erp.dtos;

import com.probeco.erp.enums.ERole;

public record DtoRegisterRequest(
    String username,
    String password,
    String email,
    ERole role
) {}
