package nabin.porfolio.controller;

import nabin.porfolio.entity.Project;
import nabin.porfolio.repository.ProjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping("/")
    public String home(Model model) {
        List<Project> projects = projectRepository.findAll();
        model.addAttribute("projects", projects);
        model.addAttribute("name", "Nabin Dhakal");  // for your Thymeleaf title/logo
        return "index"; // Your main HTML page (Thymeleaf template)
    }
}
