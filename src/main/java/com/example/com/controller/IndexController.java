package com.example.com.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class IndexController {
	
	@GetMapping("/")
	public String Index(Model model) {
		model.addAttribute("titulo", "Inicio");
		model.addAttribute("mensaje", "Hola bienvenido a la web de RUT");
		return "index";
	}
	@GetMapping("/contacto")
	public String Contacto(Model model) {
		return "contacto";
	}
	@GetMapping("/nosotros")
	public String Nosotros(Model model) {
		return "nosotros";
	}
	@GetMapping("/productos")
	public String Productos(Model model) {
		return "productos";
	}
	@GetMapping("/carrito")
	public String Carrito(Model model) {
		return "carrito";
	}
	

}
