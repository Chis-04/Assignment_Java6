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

import com.poly.Dao.CartDetailDao;
import com.poly.Dao.CartItemDao;
import com.poly.Domain.CartItem;
import com.poly.Domain.CartItemDetail;

@CrossOrigin("*")
@RestController
@RequestMapping("CartItem")
public class CartItemRestController {

	@Autowired
	CartDetailDao dDao;
	@Autowired
	CartItemDao Dao;

	@GetMapping("cartItemDetail")
	public ResponseEntity<List<CartItemDetail>> getAllDetail() {
		return ResponseEntity.ok(dDao.findAll());
	}

	@GetMapping("cartItemDetail/{cartid}")
	public ResponseEntity<List<CartItemDetail>> getDetailbyItem(@PathVariable("cartid") Integer cartid) {
		return ResponseEntity.ok(dDao.findByCartItem(cartid));
	}

	@GetMapping("cartItemDetail/{cartid}/{cart_detailid}")
	public ResponseEntity<CartItemDetail> getDetailbyItem(@PathVariable("cartid") Integer cartid,
			@PathVariable("cart_detailid") Integer cart_detailid) {
		return ResponseEntity.ok(dDao.findByCartItemAndCartItemDetail(cartid, cart_detailid));
	}

	@GetMapping("cartItems")
	public ResponseEntity<List<CartItem>> getAll() {
		return ResponseEntity.ok(Dao.findAll());
	}

	/**
	 * @param username
	 * @return
	 */
	@GetMapping("cartItems/{username}")
	public ResponseEntity<CartItem> getbyUser(@PathVariable("username") String username) {
		return ResponseEntity.ok(Dao.findByUsername(username));
	}

	@PostMapping("cartItems")
	public ResponseEntity<CartItem> PostItem(@RequestBody CartItem cartitem) {
		if (Dao.existsById(cartitem.getCartID())) {
			return ResponseEntity.badRequest().build();
		}
		Dao.save(cartitem);
		return ResponseEntity.ok(cartitem);
	}

	@PostMapping("cartItemDetail")
	public ResponseEntity<CartItemDetail> PostDetail(@RequestBody CartItemDetail cartItemDetail) {
		if (dDao.existsById(cartItemDetail.getCartDetailID())) {
			return ResponseEntity.badRequest().build();
		}
		dDao.save(cartItemDetail);
		return ResponseEntity.ok(cartItemDetail);
	}

	@PutMapping("/cartItemDetail/{cartDetailID}")
	public ResponseEntity<CartItemDetail> Put(@PathVariable("cartDetailID") Integer cartDetail,
			@RequestBody CartItemDetail detail) {
		if (!dDao.existsById(cartDetail)) {
			return ResponseEntity.notFound().build();
		}
		dDao.save(detail);
		return ResponseEntity.ok(detail);
	}

	@PutMapping("/cartItems/{cartID}")
	public ResponseEntity<CartItem> Put(@PathVariable("cartID") Integer cartID, @RequestBody CartItem item) {
		if (!Dao.existsById(cartID)) {
			return ResponseEntity.notFound().build();
		}
		Dao.save(item);
		return ResponseEntity.ok(item);
	}

	@DeleteMapping("/cartItemDetail/{cartDetailID}")
	public ResponseEntity<Void> Delete(@PathVariable("cartDetailID") Integer cartID) {
		if (!dDao.existsById(cartID)) {
			return ResponseEntity.notFound().build();
		}
		dDao.deleteById(cartID);
		return ResponseEntity.ok().build();
	}
}
