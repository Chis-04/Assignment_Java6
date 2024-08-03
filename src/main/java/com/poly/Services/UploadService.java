package com.poly.Services;

import java.io.File;

import org.springframework.web.multipart.MultipartFile;

public interface UploadService {

	File save(MultipartFile file, String folder);

//	File savefile(MultipartFile file, String folder);



}
