package com.orbis.StockTwitsChallenge.controllers;

import com.orbis.StockTwitsChallenge.dto.MessagesDto;
import com.orbis.StockTwitsChallenge.service.StockTwitsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StockTwitsController {

  private StockTwitsService stockTwitsService;

  public StockTwitsController (StockTwitsService stockTwitsService){
    this.stockTwitsService = stockTwitsService;
  }

  @GetMapping("/get-tweets-by-symbol")
  public MessagesDto getTweetsBySymbol (@RequestParam(name="symbol") String symbol){
    return stockTwitsService.getTweetsBySymbol(symbol);
  }
}
