package com.poly.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.poly.Services.UserService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class AuthConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	UserService userService;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	auth.userDetailsService(userService);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().cors().disable();
		// phan quyen

		http.authorizeRequests().antMatchers("/admin/**", "/Adminform/**").hasRole("ADMIN")
				.antMatchers("/checkout/**", "/cart/**", "/order").hasAnyRole("USER").antMatchers().authenticated()
				.anyRequest().permitAll();

		// truy cap khong dung vai tro
		http.exceptionHandling().accessDeniedPage("/auth/access/denied");
		// tuy bien form dang nhap
		http.formLogin().loginPage("/auth/login/form").loginProcessingUrl("/auth/login")
				.defaultSuccessUrl("/auth/login/success", false).failureUrl("/auth/login/error")
				.usernameParameter("username").passwordParameter("password");

		// nho tai khoan
		http.rememberMe().rememberMeParameter("remember");

		// dang xuat
		http.logout().logoutUrl("/auth/logoff").logoutSuccessUrl("/auth/logoff/success");

		// mxh
		http.oauth2Login().loginPage("/auth/login/form").defaultSuccessUrl("/oauth2/login/success")
				.failureUrl("/auth/login/error").authorizationEndpoint().baseUri("/oauth2/authorization");

	}

	@Bean
	public BCryptPasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**");
	}
}
