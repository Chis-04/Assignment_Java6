package com.poly.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poly.Dao.AccountDao;
import com.poly.Dao.AccountRoleDao;
import com.poly.Dao.RoleDao;
import com.poly.Domain.Account;
import com.poly.Domain.AccountRoles;
import com.poly.Domain.Role;

@CrossOrigin("*")
@RestController
@RequestMapping("restAccount")
public class AccountRestController {
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired
	AccountDao aDao;
	@Autowired
	AccountRoleDao Dao;
	@Autowired
	RoleDao roleDao;

	@GetMapping("/accounts")
	public ResponseEntity<List<Account>> getAll() {

		return ResponseEntity.ok(aDao.findAll());
	}

	@GetMapping("/accountRole")
	public ResponseEntity<List<AccountRoles>> getAllAccRole() {

		return ResponseEntity.ok(Dao.findAll());
	}

	@GetMapping("/Role")
	public ResponseEntity<List<Role>> getRole() {
		return ResponseEntity.ok(roleDao.findAll());
	}

	@GetMapping("/accounts/{username}")
	public ResponseEntity<Account> getOne(@PathVariable("username") String username) {
		if (!aDao.existsById(username)) {
			return ResponseEntity.notFound().build();
		}
		aDao.findById(username).get().setPassword(bCryptPasswordEncoder.encode(aDao.findById(username).get().getPassword()));
		return ResponseEntity.ok(aDao.findById(username).get());
	}
	@GetMapping("/accountss/{username}")
	public ResponseEntity<Account> getOneAccount(@PathVariable("username") String username) {
		if (!aDao.existsById(username)) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(aDao.findById(username).get());
	}
	@GetMapping("/Role/USER")
	public ResponseEntity<Role> getOneRole() {
		return ResponseEntity.ok(roleDao.findById("USER").get());
	}

	@PostMapping("/accounts")
	public ResponseEntity<Account> Post(@RequestBody Account account) {
		if (aDao.existsById(account.getEmail())) {
			return ResponseEntity.badRequest().build();
		}
		
		aDao.save(account);

		return ResponseEntity.ok(account);
	}

	@PostMapping("/accountRole")
	public ResponseEntity<AccountRoles> PostAccRole(@RequestBody AccountRoles accountRole) {
		Dao.save(accountRole);
		return ResponseEntity.ok(accountRole);
	}

	@PutMapping("/accounts/{username}")
	public ResponseEntity<Account> Put(@PathVariable("username") String username, @RequestBody Account account) {
		if (!aDao.existsById(username)) {
			return ResponseEntity.notFound().build();
		}
		aDao.save(account);
		return ResponseEntity.ok(account);
	}

	@DeleteMapping("/accounts/{username}")
	public ResponseEntity<Void> Delete(@PathVariable("username") String username) {
		if (!aDao.existsById(username)) {
			return ResponseEntity.notFound().build();
		}
		aDao.deleteById(username);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/accountRole/{id}")
	public ResponseEntity<Void> DeleteAccRole(@PathVariable("id") Integer id) {
		if (!Dao.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		Dao.deleteById(id);
		return ResponseEntity.ok().build();
	}

}
