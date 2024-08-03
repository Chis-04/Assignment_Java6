package com.poly.Dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poly.Domain.Account;

@Repository
public interface AccountDao extends JpaRepository<Account, String>{
}
