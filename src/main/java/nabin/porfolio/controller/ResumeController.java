package nabin.porfolio.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class ResumeController {

    @GetMapping("/resume")
    public ResponseEntity<Resource> downloadResume() throws IOException {
        Resource resource = new ClassPathResource("static/resume.pdf"); // resume.pdf in resources/static

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"resume.pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }
}
