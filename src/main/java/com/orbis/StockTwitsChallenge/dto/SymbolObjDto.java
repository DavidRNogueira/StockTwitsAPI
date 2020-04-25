package com.orbis.StockTwitsChallenge.dto;

public class SymbolObjDto {

    private String type;
    private int id;
    private String title;
    private String symbol;
    private String exchange;

    public SymbolObjDto (String type , int id , String title , String symbol , String exchange){
        this.type = type;
        this.id = id;
        this.title = title;
        this.symbol = symbol;
        this.exchange = exchange;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getExchange() {
        return exchange;
    }

    public void setExchange(String exchange) {
        this.exchange = exchange;
    }
}
