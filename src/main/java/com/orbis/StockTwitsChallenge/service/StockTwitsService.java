package com.orbis.StockTwitsChallenge.service;

import com.orbis.StockTwitsChallenge.client.StockTwitsClient;
import com.orbis.StockTwitsChallenge.dto.MessagesDto;
import com.orbis.StockTwitsChallenge.dto.TweetDto;
import org.springframework.stereotype.Service;

@Service
public class StockTwitsService {

  private StockTwitsClient stockTwitsClient;

  public StockTwitsService(StockTwitsClient stockTwitsClient){
    this.stockTwitsClient = stockTwitsClient;
  }

  public MessagesDto getTweetsBySymbol(String symbol){
      MessagesDto messagesDto = stockTwitsClient.getTweetsBySymbols(symbol);
      for (TweetDto tweetDto : messagesDto.getMessages()){
          tweetDto.setSymbol(symbol);
      }
      return messagesDto;
  }
}
