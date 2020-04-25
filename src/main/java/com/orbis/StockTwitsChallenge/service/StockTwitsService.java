package com.orbis.StockTwitsChallenge.service;

import com.orbis.StockTwitsChallenge.client.StockTwitsClient;
import com.orbis.StockTwitsChallenge.dto.MessagesDto;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;

@Service
public class StockTwitsService {

  private StockTwitsClient stockTwitsClient;

  public StockTwitsService(StockTwitsClient stockTwitsClient){
    this.stockTwitsClient = stockTwitsClient;
  }

  public MessagesDto getTweetsBySymbol(String symbol){
      return stockTwitsClient.getTweetsBySymbols(symbol);
  }
}
