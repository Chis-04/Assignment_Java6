package com.poly.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poly.Dao.OrderDao;
import com.poly.Domain.Order;

@CrossOrigin("*")
@RestController
@RequestMapping("order")
public class OrderRestController {
	@Autowired
	OrderDao oDao;

	@GetMapping("/Orders")
	public ResponseEntity<List<Order>> getAllOrder() {
		return ResponseEntity.ok(oDao.findAll());
	}

	@GetMapping("/Order/{orderid}")
	public ResponseEntity<Order> getOne(@PathVariable("orderid") Integer orderId) {
		if (!oDao.existsById(orderId)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(oDao.findById(orderId).get());
	}

	@GetMapping("/Orders/{username}")
	public ResponseEntity<List<Order>> getOrdering(@PathVariable("username") String username) {

		return ResponseEntity.ok(oDao.findOrderingByUsername(username));
	}

	@GetMapping("/Ordered/{username}")
	public ResponseEntity<List<Order>> getOrdered(@PathVariable("username") String username) {

		return ResponseEntity.ok(oDao.findOrderedByUsername(username));
	}

	@PostMapping("/Order")
	public ResponseEntity<Order> Post(@RequestBody Order order) {
		if (oDao.existsById(order.getOrderID())) {
			return ResponseEntity.badRequest().build();
		}

		return ResponseEntity.ok(oDao.save(order));
	}

	@PutMapping("/Order/{orderid}")
	public ResponseEntity<Order> Put(@PathVariable("orderid") Integer orderid, @RequestBody Order order) {
		if (!oDao.existsById(orderid)) {
			return ResponseEntity.notFound().build();
		}
		oDao.save(order);
		return ResponseEntity.ok(order);
	}

	@DeleteMapping("/Order/{orderid}")
	public ResponseEntity<Void> Delete(@PathVariable("orderid") Integer orderid) {
		if (!oDao.existsById(orderid)) {
			return ResponseEntity.notFound().build();
		}
		oDao.deleteById(orderid);
		return ResponseEntity.ok().build();
	}
}
