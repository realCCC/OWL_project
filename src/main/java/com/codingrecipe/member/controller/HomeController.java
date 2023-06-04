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
    public String f1(){
        return "function1";
    }
    @GetMapping("function2")
    public String f2(){
        return "function2";
    }
    @GetMapping("function3")
    public String f3(){
        return "function3";
    }
    @GetMapping("roulette")
    public String f4(){
        return "roulette";
    }

    @GetMapping("/login")
    public String index() {
        return "index";
    }
}
