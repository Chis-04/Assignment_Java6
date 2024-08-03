package com.poly.Controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.poly.Dao.AccountRoleDao;
import com.poly.Domain.AccountRoles;
import com.poly.Services.UserService;

@Controller
public class AuthController {
	@Autowired
	HttpServletRequest res;

	@Autowired
	AccountRoleDao dao;

	@RequestMapping("/auth/login/form")
	public String form() {
		return "login-register";
	}

	@RequestMapping("/auth/login/success")
	public String succes(Model model) {
		List<AccountRoles> acc = dao.findByAccount(res.getRemoteUser());
		for (AccountRoles ar : acc) {
			System.out.println("oke " + ar.getRole().getId());
			if (ar.getRole().getId().equalsIgnoreCase("USER")) {
				return "redirect:/";
			}
		}
		return "redirect:/admin";
	}

	@RequestMapping("/auth/logoff/success")
	public String logoff(Model model) {
		model.addAttribute("message", "Đăng xuất thành công <3");
		return "forward:/auth/login/form";
	}

	@RequestMapping("/auth/login/error")
	public String error(Model model) {
		model.addAttribute("message", "Tài khoản không hợp lệ!!");
		return "forward:/auth/login/form";
	}

	@RequestMapping("/auth/access/denied")
	public String denied(Model model) {
		model.addAttribute("message", "Không đúng vai trò");
		return "forward:/auth/login/form";
	}

	@Autowired
	UserService userservice;

	@RequestMapping("/oauth2/login/success")
	public String success(OAuth2AuthenticationToken su) {
		userservice.loginFromOAuth2(su);
		return "redirect:/";
	}
}
