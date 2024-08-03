package com.poly.Dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.poly.Domain.Products;

import java.util.List;

@Repository
public interface ProductDao extends JpaRepository<Products, Integer> {

	@Query(value = "select * from products where categoryid = ?", nativeQuery = true)
	List<Products> findByCategory(Integer categoryid);
}
