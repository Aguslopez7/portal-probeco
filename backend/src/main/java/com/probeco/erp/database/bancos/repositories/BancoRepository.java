package com.probeco.erp.database.bancos.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.probeco.erp.database.bancos.entities.Banco;
import com.probeco.erp.enums.EBancoProveedor;

@Repository
public interface BancoRepository extends JpaRepository<Banco, Long> {
    public Optional<Banco> findByName(String name);

    public Optional<Banco> findByNameAndNumeroCuenta(EBancoProveedor name, String numeroCuenta);

    List<Banco> findAllByOrderByCreatedAtDesc();
}
