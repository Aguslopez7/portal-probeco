package com.probeco.erp.dtos;

import com.probeco.erp.enums.ERole;

public record DtoUser(
    String id,
    String username,
    String email,
    ERole role
) {}
