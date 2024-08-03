package com.poly.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller

public class IndexController {
	@RequestMapping("/")
	public String index () {
		return "redirect:/home";
	}
	@RequestMapping({"/admin/**","/home/admins"})
	public String admin () {
		return "redirect:/Adminform/pages/index.html";
	}
	@RequestMapping("/pages/index")
	public String main () {
		return "/Adminform/pages/index";
	}
}
