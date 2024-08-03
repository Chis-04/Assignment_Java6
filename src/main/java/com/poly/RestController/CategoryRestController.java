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

import com.poly.Dao.CategoryDao;
import com.poly.Domain.Category;

@CrossOrigin("*")
@RestController
@RequestMapping("categoryRest")
public class CategoryRestController {
	@Autowired
	CategoryDao cDao;

	@GetMapping("/categories")
	public ResponseEntity<List<Category>> getAll() {
		return ResponseEntity.ok(cDao.findAll());
	}

	@GetMapping("/categories/{categoryId}")
	public ResponseEntity<Category> getOne(@PathVariable("categoryId") Integer categoryId) {
		if (!cDao.existsById(categoryId)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(cDao.findById(categoryId).get());
	}

	@PostMapping("/categories")
	public ResponseEntity<Category> Post(@RequestBody Category category) {
		if (cDao.existsById(category.getCategoryID())) {
			return ResponseEntity.badRequest().build();
		}
		cDao.save(category);
		return ResponseEntity.ok(category);
	}

	@PutMapping("/categories/{categoryId}")
	public ResponseEntity<Category> Put(@PathVariable("categoryId") Integer categoryId,
			@RequestBody Category category) {
		if (!cDao.existsById(categoryId)) {
			return ResponseEntity.notFound().build();
		}
		cDao.save(category);
		return ResponseEntity.ok(category);
	}

	@DeleteMapping("/categories/{categoryId}")
	public ResponseEntity<Void> Delete(@PathVariable("categoryId") Integer categoryId) {
		if (!cDao.existsById(categoryId)) {
			return ResponseEntity.notFound().build();
		}
		cDao.deleteById(categoryId);
		return ResponseEntity.ok().build();
	}
}
