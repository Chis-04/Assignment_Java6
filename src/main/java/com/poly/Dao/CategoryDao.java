package com.poly.Dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poly.Domain.Category;

@Repository
public interface CategoryDao extends JpaRepository<Category, Integer>{

}
