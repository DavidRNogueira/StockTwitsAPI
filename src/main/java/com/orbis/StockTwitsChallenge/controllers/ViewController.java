package com.orbis.StockTwitsChallenge.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

  @GetMapping(value="/")
  public String toPage (){
    return "../static/build/index";
  }
}
