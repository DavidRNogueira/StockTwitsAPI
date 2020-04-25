package com.orbis.StockTwitsChallenge.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MessagesDto {
    @JsonProperty("messages")
    private List<TweetDto> messages;

    public List<TweetDto> getMessages() {
        return messages;
    }

    public void setMessages(List<TweetDto> messages) {
        this.messages = messages;
    }
}
