package com.poly.Controller;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.poly.Dao.CartDetailDao;
import com.poly.Dao.CartItemDao;
import com.poly.Dao.ProductDao;
import com.poly.Domain.Products;

@Controller
public class ProductController {
	@Autowired
	ProductDao dao;
	@Autowired

	CartDetailDao cartDao;

	@Autowired
	CartItemDao itemDao;

	@Autowired
	HttpServletRequest res;

	@RequestMapping({ "home", "home/user" })
	public String getAll(Model model) {
		return "Usersform/home";
	}

	@RequestMapping("home/{id}")
	public String getDetail(Model model, @PathVariable("id") Integer id) {
		Optional<Products> item = dao.findById(id);
		model.addAttribute("item", item.get());
		return "Usersform/product-details";
	}

	@RequestMapping("about")
	public String about() {
		return "Usersform/about";
	}

	@RequestMapping("blog-details")
	public String blogdetails() {
		return "Usersform/blog-details";
	}

	@RequestMapping("checkout")
	public String checkout() {
		return "Usersform/checkout";
	}

	@RequestMapping("contact")
	public String contact() {
		return "Usersform/contact";
	}

	@RequestMapping("customer-review")
	public String customerreview() {
		return "Usersform/customer-review";
	}

	@RequestMapping("portfolio-card-box-2")
	public String portfoliocard() {
		return "Usersform/portfolio-card-box-2";
	}

	@RequestMapping("single-portfolio")
	public String singleportfolio() {
		return "Usersform/single-portfolio";
	}

	@RequestMapping("team")
	public String team() {
		return "Usersform/team";
	}

	@RequestMapping("wishlist")
	public String wishlist() {
		return "Usersform/wishlist";
	}

	@RequestMapping("blog")
	public String blog() {
		return "Usersform/blog";
	}

	@RequestMapping("cart")
	public String cart() {
		return "Usersform/cart";
	}

	@RequestMapping("order")
	public String order() {
		return "Usersform/order";
	}
}
