package com.poly.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.poly.Domain.OrderDetail;

@Repository
public interface OrderDetailDao extends JpaRepository<OrderDetail, Integer> {
	@Query(value = "select * from order_detail where orderid = ?", nativeQuery = true)
	List<OrderDetail> findByInfo(Integer orderid);

	@Query(value = "select * from order_detail join orders on orders.orderid = order_detail.orderid\r\n"
			+ " where orders.orderid = ?1  and orders.user_id =?2", nativeQuery = true)
	List<OrderDetail> findByOrderAndUsername(Integer orderid, String username);

	@Query(value = "select * from order_detail \r\n" + "join orders on order_detail.orderid = orders.orderid\r\n"
			+ "where orders.user_id = ? and  orders.status = 4 or orders.status =3", nativeQuery = true)
	List<OrderDetail> findByCanlledAndBought(String username);

	@Query(value = "select * from order_detail \r\n" + "join orders on order_detail.orderid = orders.orderid\r\n"
			+ "where orders.user_id = ? and  orders.status = 1 or orders.status =2", nativeQuery = true)
	List<OrderDetail> findByOke(String username);

	@Query(value = "select * from order_details where orderid = ?", nativeQuery = true)
	List<OrderDetail> findByOrderId(Integer orderid);
}
