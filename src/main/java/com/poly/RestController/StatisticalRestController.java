package com.poly.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poly.Dao.OrderDao;
import com.poly.Dao.OrderDetailDao;
import com.poly.Domain.Order;
import com.poly.Domain.OrderDetail;

@CrossOrigin("*")
@RestController
@RequestMapping("statistical")
public class StatisticalRestController {
	@Autowired
	OrderDao dao;
	@Autowired
	OrderDetailDao detailDao;

	@GetMapping("confirm")
	public ResponseEntity<List<Order>> getAllOrder1() {
		return ResponseEntity.ok(dao.findByConfirm());
	}

	@GetMapping("confirms")
	public ResponseEntity<List<Order>> getAllOrder() {
		return ResponseEntity.ok(dao.findAllDesc());
	}

	@GetMapping("turnoverday")
	public ResponseEntity<List<Object[]>> getByDay() {
		return ResponseEntity.ok(dao.findStatisticalByDay());
	}

	@GetMapping("turnovermonth")
	public ResponseEntity<List<Object[]>> getByMonth() {
		return ResponseEntity.ok(dao.findStatisticalByMonth());
	}

	@GetMapping("turnoveryear")
	public ResponseEntity<List<Object[]>> getByYear() {
		return ResponseEntity.ok(dao.findStatisticalByYear());
	}

	@GetMapping("top5items")
	public ResponseEntity<List<Object[]>> getTop5item() {
		return ResponseEntity.ok(dao.Top5HotSellingItem());
	}

	@GetMapping("top5buyer")
	public ResponseEntity<List<Object[]>> getTop5buyer() {
		return ResponseEntity.ok(dao.top5buyer());
	}

	@GetMapping("/infoDetail/{orderid}")
	public ResponseEntity<List<OrderDetail>> getInfo(@PathVariable("orderid") Integer orderDetailId) {
		if (!detailDao.existsById(orderDetailId)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(detailDao.findByInfo(orderDetailId));
	}

	@GetMapping("/confirm/{orderid}")
	public ResponseEntity<Order> getOne(@PathVariable("orderid") Integer orderId) {
		if (!dao.existsById(orderId)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(dao.findById(orderId).get());
	}

	@PutMapping("/confirm/{orderid}")
	public ResponseEntity<Order> Put(@PathVariable("orderid") Integer orderid, @RequestBody Order order) {
		if (!dao.existsById(orderid)) {
			return ResponseEntity.notFound().build();
		}
		dao.save(order);
		return ResponseEntity.ok(order);
	}
}
