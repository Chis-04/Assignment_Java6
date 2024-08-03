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

import com.poly.Dao.OrderDetailDao;
import com.poly.Domain.OrderDetail;

@CrossOrigin("*")
@RestController
@RequestMapping("orderDetail")
public class OrderDetailRestController {
	@Autowired
	OrderDetailDao detailDao;

	@GetMapping("/ListOrderDetail")
	public ResponseEntity<List<OrderDetail>> getAllOrder() {
		return ResponseEntity.ok(detailDao.findAll());
	}

	@GetMapping("/ListDetail/{orderid}/{username}")
	public ResponseEntity<List<OrderDetail>> getByOrderAndUsername(@PathVariable("orderid") Integer orderid,
			@PathVariable("username") String username) {
		return ResponseEntity.ok(detailDao.findByOrderAndUsername(orderid, username));
	}

	@GetMapping("/ListOrderDetail/{username}")
	public ResponseEntity<List<OrderDetail>> getByCanlledAndBought(@PathVariable("username") String username) {
		return ResponseEntity.ok(detailDao.findByCanlledAndBought(username));
	}

	@GetMapping("/OrderDetailling/{username}")
	public ResponseEntity<List<OrderDetail>> getByOke(@PathVariable("username") String username) {
		return ResponseEntity.ok(detailDao.findByOke(username));
	}

	@GetMapping("/OrderDetail/{orderDetailId}")
	public ResponseEntity<OrderDetail> getOne(@PathVariable("orderDetailId") Integer orderDetailId) {
		if (!detailDao.existsById(orderDetailId)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(detailDao.findById(orderDetailId).get());
	}

//	@PostMapping("/OrderDetailUser")
//	public ResponseEntity<OrderDetail> Post(@RequestBody OrderDetail orderdetail) {
//		if (detailDao.existsById(orderdetail.getOrderDetailID())) {
//			return ResponseEntity.badRequest().build();
//		}
//
//		return ResponseEntity.ok(detailDao.save(orderdetail));
//	}
	@PostMapping("/OrderDetailUser")
	public ResponseEntity<List<OrderDetail>> Post(@RequestBody List<OrderDetail> orderdetail) {


		return ResponseEntity.ok(detailDao.saveAll(orderdetail));
	}

	@PutMapping("/OrderDetail/{orderDetailId}")
	public ResponseEntity<OrderDetail> Put(@PathVariable("orderDetailId") Integer orderDetailId,
			@RequestBody OrderDetail order) {
		if (!detailDao.existsById(orderDetailId)) {
			return ResponseEntity.notFound().build();
		}
		detailDao.save(order);
		return ResponseEntity.ok(order);
	}

	@DeleteMapping("/OrderDetail/{orderDetailId}")
	public ResponseEntity<Void> Delete(@PathVariable("orderDetailId") Integer orderDetailId) {
		if (!detailDao.existsById(orderDetailId)) {
			return ResponseEntity.notFound().build();
		}
		detailDao.deleteById(orderDetailId);
		return ResponseEntity.ok().build();
	}
}
