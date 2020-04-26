package com.orbis.StockTwitsChallenge.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.orbis.StockTwitsChallenge.dto.MessagesDto;
import com.orbis.StockTwitsChallenge.dto.SearchSymbolsDto;
import com.orbis.StockTwitsChallenge.dto.SymbolObjDto;
import com.orbis.StockTwitsChallenge.dto.TweetDto;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectReader;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockTwitsClient {

  private HttpURLConnection httpURLConnection;
  private ObjectReader objectReader;


  public StockTwitsClient(){
    objectReader = new ObjectMapper().readerFor(MessagesDto.class);
  }

  public MessagesDto getTweetsBySymbols (String symbol) {
    try {
      BufferedReader reader;
      String line;
      StringBuffer responseContent = new StringBuffer();

      URL url = new URL("https://api.stocktwits.com/api/2/streams/symbol/" +  symbol + ".json?limit=10");
      httpURLConnection = (HttpURLConnection) url.openConnection();
      httpURLConnection.setRequestMethod("GET");
      httpURLConnection.setConnectTimeout(5000);
      httpURLConnection.setReadTimeout(5000);
      httpURLConnection.connect();

      int status = httpURLConnection.getResponseCode();

      if (status > 299) {
        reader = new BufferedReader(new InputStreamReader(httpURLConnection.getErrorStream()));

        while ((line = reader.readLine()) != null){
          responseContent.append(line);
        }
        reader.close();
      } else {
        reader = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream()));

        while ((line = reader.readLine()) != null){
          responseContent.append(line);
        }
        reader.close();

        String results = responseContent.toString();
        MessagesDto messages = objectReader.readValue(results);
        return messages;
      }


    }
    catch ( MalformedURLException e){
      e.printStackTrace();
    } catch (ProtocolException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      httpURLConnection.disconnect();
    }
    return null;
  }

}
