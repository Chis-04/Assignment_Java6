package com.poly.Services.Impl;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.poly.Services.UploadService;

@Service
public class UploadServiceImpl implements UploadService{
@Autowired
HttpServletRequest request;

public File save(MultipartFile file, String folder) {
	File dir= new File(request.getServletContext().getRealPath("/asset/"+folder));
	if(!dir.exists()) {
		dir.mkdirs();
	}
	String s = System.currentTimeMillis() + toString();
	String name = Integer.toHexString(s.hashCode()) + (".jpg");
	try {
		File saveFile = new File(dir, name);
		file.transferTo(saveFile);
		System.out.println(saveFile.getAbsolutePath() + ": hash: "+s.hashCode() + ": substr :"+s.substring(s.lastIndexOf(".")));
		return saveFile;
	} catch (Exception e) {
	throw new RuntimeException();
	}
}


//public File savefile(MultipartFile file, String folder) {
//	String fileLocation = new File("src\\main\\resources\\static\\asset\\"+folder).getAbsolutePath();
//	File dir= new File(fileLocation);
//	if(!dir.exists()) {
//		dir.mkdirs();
//	}
//	try {
//	
//		File saveFile = new File(dir, name);
//		file.transferTo(saveFile);
//		System.out.println(saveFile.getAbsolutePath() + "s: "+s +"name :" +name);
//		return saveFile;
//	} catch (Exception e) {
//	throw new RuntimeException();
//	}
//}
}
