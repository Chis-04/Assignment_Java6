package com.poly.Dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poly.Domain.Brand;

@Repository
public interface BrandDao extends JpaRepository<Brand, Integer>{

}
