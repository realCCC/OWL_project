package com.codingrecipe.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    //localhost:8080키면 home.html을 출력
    @GetMapping("/")
    public String home(){
        return "home";
    }

    @GetMapping("function1")
    public String f3(){
        return "function1";
    }

    @GetMapping("/login")
    public String index() {
        return "index";
    }
}
