package com.poly.Controller;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HandleErrorController implements ErrorController {
	@RequestMapping("/error")
	public String handleError(HttpServletRequest request, ModelMap model) {
		Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
		if (status != null) {
			Integer statusCode = Integer.valueOf(status.toString());
			if (statusCode == HttpStatus.NOT_FOUND.value()) {
				model.addAttribute("error", "Bạn lạc đường rồi quay trở lại nào!!");
				return "404";
			}
		}
		return "";

	}

	public String getErrorPath() {
		return "/error";
	}
}