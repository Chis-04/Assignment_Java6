package com.poly.RestController;

import java.text.DecimalFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poly.DTO.Email;
import com.poly.Dao.AccountDao;
import com.poly.Dao.OrderDetailDao;
import com.poly.Domain.Order;
import com.poly.Domain.OrderDetail;
import com.poly.Services.EmailService;
import com.poly.Services.SessionService;

@CrossOrigin("*")
@RestController
@RequestMapping("send")
public class sendMailRestApi {
	@Autowired
	SessionService session;

	@Autowired
	OrderDetailDao ODrepo;

	@Autowired
	EmailService emaildao;

	@Autowired
	AccountDao Urepo;

	@PostMapping("/otptest")
	public ResponseEntity<Integer> sendtest(@RequestBody Email email) {
		int random_otp = (int) Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
		if (Urepo.existsById(email.getTo())) {
			return ResponseEntity.notFound().build();
		}

		String body = "Mã OTP CỦA BẠN LÀ: " + random_otp;
		session.set("otp", random_otp);

		emaildao.sendmail(email.getTo(), email.getSubject(), body);

		return ResponseEntity.ok(random_otp);
	}

	@PostMapping("/otp-forgot")
	public ResponseEntity<Integer> sendotpforgot(@RequestBody Email email) {
		int random_otp = (int) Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
		if (!Urepo.existsById(email.getTo())) {
			return ResponseEntity.notFound().build();
		}
		String body = "Mã OTP ĐỂ LẤY LẠI MẬT KHẨU LÀ: " + random_otp;
		session.set("otpforgot", random_otp);

		emaildao.sendmail(email.getTo(), email.getSubject(), body);

		return ResponseEntity.ok(random_otp);
	}

	@GetMapping("/maotpforgot")
	public Integer maOTPForgot() {
		try {
			int otp = session.get("otpforgot");
			System.out.println(otp);
			return otp;
		} catch (Exception e) {
			int randomotp = (int) Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000);
			return randomotp;
		}
	
	}

	@GetMapping("/maotp")
	public Integer maOTP() {
		try {
		int otp = session.get("otp");
		System.out.println(otp);
		return otp;
		}catch (Exception e) {
			int randomotp = (int) Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000);
			return randomotp;
		}
	}

	@GetMapping("removeSession")
	public String removeotp() {
	        session.remove("otpforgot");
	        session.remove("otp");
	        return "Thanh Cong";
	    }

	
	public String format(String number) {
		DecimalFormat formatter = new DecimalFormat("###,###,###.##");
		return formatter.format(Double.valueOf(number)) + " VNĐ";
	}

	@PostMapping("/orders")
	public void sendMailOrder(@RequestBody Order order) {
		String trangthai = "";
		if (order.getStatus() == 1) {
			trangthai = "Đặt hàng thành công";
		} else if (order.getStatus() == 2) {
			trangthai = "T-MART đã xác nhận đơn hàng của bạn";
		} else if (order.getStatus() == 3) {
			trangthai = "Bạn đã hủy đơn hàng :(";
		} else if (order.getStatus() == 4) {
			trangthai = "Cám ơn bạn đã tin tưởng T-MART";
		} else {
			trangthai = "Lỗi Gửi Mail";
		}
		List<OrderDetail> list = ODrepo.findByInfo(order.getOrderID());

		StringBuilder content = new StringBuilder();
		System.out.println("so lisst" + list.size());
		content.append(
				"<div style=\"width: 70%; margin: auto; min-height: 500px; background-color: rgb(247, 247, 247); border-radius: 20px;\">\r\n"
						+ "        <h2 style=\"text-align: center; padding: 20px; font-family: Arial, Helvetica, sans-serif;\">"
						+ "T-MART" + "</h2>\r\n" + "        <br>\r\n"
						+ "        <div style=\"margin-left: 10px; margin-right: 10px;\">\r\n"
						+ "            <p><b> Xin chào,</b> <i> " + order.getAccountoder().getName() + "</i> !</p>\r\n"
						+ "            <br>\r\n" + "            <p style=\"font-weight: bolder;\">" + trangthai + " (Mã đơn hàng: " +order.getOrderID() +")"
						+ "</p>\r\n" + "            <hr>");
		for (OrderDetail item : list) {
			content.append("\r\n"
					+ "            <div style=\"display: flex; margin-top: 10px; margin-left: 50px;\">\r\n"
					+ "                <img src=\"https://firebasestorage.googleapis.com/v0/b/uploadimagesjava6.appspot.com/o/"
					+ item.getProductOrder().getImage() + "?alt=media&token=155d6665-5e02-42e7-9b7b-f22eb82799fa"
					+ "\"\r\n" + "                    width=\"100px\">\r\n"
					+ "                <ul style=\"list-style-type: none;\">\r\n"
					+ "                    <li style=\"font-weight: bold;\">" + item.getProductOrder().getName()
					+ "</li>\r\n" + "                    <li>Số lượng: " + item.getQuantity() + "</li>\r\n"
					+ "                    <li>Tổng tiền: " + format(String.valueOf(item.getUnitPrice())) + "</li>\r\n"
					+ "                </ul>\r\n" + "            </div>");
		}
		content.append("<div style=\"margin-top: 20px;\">\r\n"
				+ "                <p style=\"font-size: 18px; font-weight: bold;\">Tổng tiền: <span style=\"color: crimson; font-style: italic;\">"
				+ format(String.valueOf(order.getAmount())) + "</span></p>\r\n" + "            </div>\r\n"
				+ "            <div style=\"margin-top: 20px;\">\r\n"
				+ "                <p style=\"font-family: Arial, Helvetica, sans-serif; font-weight: bold;\">Cám ơn bạn đã tin tưởng T-MART!</p>\r\n"
				+ "                <p style=\"font-family: Arial, Helvetica, sans-serif; font-weight: bold;\"></p>\r\n"
				+ "            </div> \r\n" + "        </div>\r\n" + "    </div>");

		emaildao.sendmail(order.getAccountoder().getEmail(), trangthai, content.toString());
	}
}
