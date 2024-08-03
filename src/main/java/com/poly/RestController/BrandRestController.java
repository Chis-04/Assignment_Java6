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

import com.poly.Dao.BrandDao;
import com.poly.Domain.Brand;

@CrossOrigin("*")
@RestController
@RequestMapping("brandRest")
public class BrandRestController {
	@Autowired
	BrandDao bDao;

	@GetMapping("/brands")
	public ResponseEntity<List<Brand>> getAll() {
		return ResponseEntity.ok(bDao.findAll());
	}

	@GetMapping("/brands/{brandID}")
	public ResponseEntity<Brand> getOne(@PathVariable("brandID") Integer brandID) {
		if (!bDao.existsById(brandID)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(bDao.findById(brandID).get());
	}

	@PostMapping("/brands")
	public ResponseEntity<Brand> Post(@RequestBody Brand brand) {
		if (bDao.existsById(brand.getBrandID())) {
			return ResponseEntity.badRequest().build();
		}
		bDao.save(brand);
		return ResponseEntity.ok(brand);
	}

	@PutMapping("/brands/{brandID}")
	public ResponseEntity<Brand> Put(@PathVariable("brandID") Integer brandID, @RequestBody Brand brand) {
		if (!bDao.existsById(brandID)) {
			return ResponseEntity.notFound().build();
		}
		bDao.save(brand);
		return ResponseEntity.ok(brand);
	}

	@DeleteMapping("/brands/{brandID}")
	public ResponseEntity<Void> Delete(@PathVariable("brandID") Integer brandID) {
		if (!bDao.existsById(brandID)) {
			return ResponseEntity.notFound().build();
		}
		bDao.deleteById(brandID);
		return ResponseEntity.ok().build();
	}
}
