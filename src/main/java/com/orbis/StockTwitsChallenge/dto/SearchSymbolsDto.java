package com.orbis.StockTwitsChallenge.dto;

import java.util.List;

public class SearchSymbolsDto {

    private List<SymbolObjDto> results;

    public List<SymbolObjDto> getResults() {
        return results;
    }

    public void setResults(List<SymbolObjDto> results) {
        this.results = results;
    }
}
