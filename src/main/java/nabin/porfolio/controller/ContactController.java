package nabin.porfolio.controller;

import nabin.porfolio.entity.Contact;
import nabin.porfolio.repository.ContactRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @PostMapping("/contact")
    public String submitContactForm(@RequestParam String name,
                                    @RequestParam String email,
                                    @RequestParam(required = false) String phone,
                                    @RequestParam(required = false) String address,
                                    @RequestParam String message) {

        Contact contact = new Contact(name, email, phone, address, message);
        contactRepository.save(contact);

        // Redirect to home page (or wherever you want)
        return "redirect:/#contact";
    }
}
