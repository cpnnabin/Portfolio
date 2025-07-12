package nabin.porfolio.controller;

import nabin.porfolio.entity.Contact;
import nabin.porfolio.entity.Project;
import nabin.porfolio.repository.ContactRepository;
import nabin.porfolio.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class PortfolioController {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping("/portfolio")
    public String showPortfolio(Model model) {
        model.addAttribute("name", "Nabin Dhakal");
        model.addAttribute("email", "cpnnaingovnp@gmail.com");
        model.addAttribute("phone", "9869596970");

        List<Project> projects = projectRepository.findAll();
        List<Contact> contacts = contactRepository.findAll();

        model.addAttribute("projects", projects);
        model.addAttribute("contacts", contacts);

        return "index"; // maps to index.html
    }
}
