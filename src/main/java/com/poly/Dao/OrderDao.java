package com.poly.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.poly.Domain.Order;

@Repository
public interface OrderDao extends JpaRepository<Order, Integer> {
	@Query(value = "select * from orders order by order_date desc", nativeQuery = true)
	List<Order> findAllDesc();

	@Query(value = "select * from orders where user_id = ?", nativeQuery = true)
	Order findOrderByEmail(String user_id);
	
	@Query(value = "select * from orders where orders.user_id = ? and  status between 1 and 2", nativeQuery = true)
	List<Order> findOrderingByUsername(String username);

	@Query(value = "select * from orders where orders.user_id = ? and  status between 3 and 4", nativeQuery = true)
	List<Order> findOrderedByUsername(String username);

	@Query(value = "select * from orders  where status = 1", nativeQuery = true)
	List<Order> findByConfirm();

	@Query(value = "select order_date as 'Time' ,count(orderid) as 'so luong',sum(amount) as 'tong tien' from orders where status = 4\r\n"
			+ "group by order_date\r\n" + "order by order_date desc", nativeQuery = true)
	List<Object[]> findStatisticalByDay();

	@Query(value = "select   cast(year(order_date) as varchar) + '-' +cast(month(order_date) as varchar) month, \r\n"
			+ "count(orderid) as 'count', sum(amount) as 'sum' from orders where status = 4\r\n"
			+ "group by month(order_date), year(order_date)\r\n" + "order by month desc", nativeQuery = true)
	List<Object[]> findStatisticalByMonth();

	@Query(value = "select year(order_date) as 'year',count(orderid) as 'count', sum(amount) as 'sum' from orders where status = 4\r\n"
			+ "group by year(order_date)\r\n" + "order by year(order_date) desc", nativeQuery = true)
	List<Object[]> findStatisticalByYear();

	@Query(value = "select top 5 products.name , sum(order_detail.unit_price) as 'Tổng tiền', sum(order_detail.quantity) as 'Số lượng' from order_detail \r\n"
			+ "join orders on orders.orderid = order_detail.orderid\r\n"
			+ "join products on order_detail.productid = products.productid \r\n" + "where orders.status = 4\r\n"
			+ "group by products.name\r\n" + "order by sum(order_detail.quantity) desc", nativeQuery = true)
	List<Object[]> Top5HotSellingItem();

	@Query(value = "select top 5 orders.user_id, accounts.name as 'Ten', COUNT(orders.orderid) as 'Tong so don', sum(orders.amount) as 'Tong tien'\r\n"
			+ "from orders\r\n" + "join accounts on accounts.email = orders.user_id\r\n"
			+ "where orders.status = 4\r\n" + "group by orders.user_id,accounts.name \r\n"
			+ "order by COUNT(accounts.email) desc", nativeQuery = true)
	List<Object[]> top5buyer();
}
