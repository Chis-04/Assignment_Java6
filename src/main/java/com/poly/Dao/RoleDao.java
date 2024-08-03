package com.poly.Dao;



import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.poly.Domain.Role;

@Repository
public interface RoleDao extends JpaRepository<Role,String>{

}
