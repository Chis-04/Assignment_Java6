package com.poly.Services.Impl;


import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.poly.Services.EmailService;

@Service
public class EmailServiceIpml implements EmailService{

	@Autowired
	JavaMailSender sender;
	

	@Override
	public String sendmail(String to,String subject, String body) {
		try {
			MimeMessage mesage = sender.createMimeMessage();
			MimeMessageHelper messhelper = new MimeMessageHelper(mesage,true,"utf-8");
			
			messhelper.setFrom("dammebongda021@gmail.com");
			messhelper.setTo(to);
			messhelper.setSubject(subject);
			messhelper.setText(body,true);
		
			sender.send(mesage);
			
			return "thanh cong";
		} catch (Exception e) {
			return "That bai";
		}
	}
	
}
