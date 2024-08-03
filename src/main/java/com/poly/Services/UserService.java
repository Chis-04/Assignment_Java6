package com.poly.Services;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import com.poly.Dao.AccountDao;
import com.poly.Dao.AccountRoleDao;
import com.poly.Domain.Account;

@Service
public class UserService implements UserDetailsService {
	@Autowired
	AccountDao accDAO;
	@Autowired
	AccountRoleDao accountRoleRepository;
	@Autowired
	BCryptPasswordEncoder pe;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
try {
	Account account = accDAO.findById(username.trim()).get();
	// tao user detail tu account
System.out.println("Asds" + username);
	String password = account.getPassword();
//	String[] roles = account.getAccountRoles().stream()
//			.map(au -> au.getRole().getId())
//			.collect(Collectors.toList()).toArray(new String[0]);
	
	String[] roles = accountRoleRepository.findByAccount(username).stream()
			.map(au -> au.getRole().getId())
			.collect(Collectors.toList()).toArray(new String[0]);
	return User.withUsername(username)
			.password(pe.encode(password))
			.roles(roles).build();
} catch (Exception e) {
	throw new UsernameNotFoundException(username + "not found");
}

		

	}
	public void loginFromOAuth2(OAuth2AuthenticationToken oauth2) {
		String email = oauth2.getPrincipal().getAttribute("email");
		String password=Long.toHexString(System.currentTimeMillis());
		
		UserDetails user = User.withUsername(email)
				.password(pe.encode(password)).roles("USER").build();
		Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(auth);
	}
}
