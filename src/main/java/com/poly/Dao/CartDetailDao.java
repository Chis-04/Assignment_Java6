package com.poly.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.poly.Domain.CartItemDetail;

@Repository
public interface CartDetailDao extends JpaRepository<CartItemDetail, Integer> {
	@Query(value = "select * from cart_item_details where cartid = ?", nativeQuery = true)
	List<CartItemDetail> findByCartItem(Integer cartid);

	@Query(value = "select * from cart_item_details where cartid = ? and cart_detailid = ?", nativeQuery = true)
	CartItemDetail findByCartItemAndCartItemDetail(Integer cartid, Integer cart_detailid);

//	@Query(value ="select * from cart_item_details where productid = ?", nativeQuery = true)
//	CartItemDetail findByProductName(String productid);
}
