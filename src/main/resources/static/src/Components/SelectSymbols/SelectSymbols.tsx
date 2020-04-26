import React , {FC, useState, useContext, useEffect} from "react";
import { 
    SelectSymbolsDiv,
    SymbolInput, 
    AddSymbolBtn, 
    SymbolTagsDiv, 
    TagDiv, 
    SymbolName, 
    TagsHeader, 
    InputDiv, 
    FormError, 
    TweetCounter
} from "./SelectSymbolsStyles";
import axios from "axios"
import { Context } from "../../App";
import { ITweet, ITweetCounter } from "../../interfaces";

const SelectSymbols:FC = ():JSX.Element => {
  const context = useContext(Context);
  const [currentSymbol , setCurrentSymbol] = useState<string>("");
  const [allSymbols , setAllSymbols] = useState<string[]>([]);
  const [compErrors , setCompErrors] = useState<string[]>([]);
  const [tweets , setTweets] = useState<ITweet[]>([]);
  const [tweetCounter , setTweetCounter] = useState<ITweetCounter[]>([]);
  let interval: any = null;

  const startInterval = () => {
    if (allSymbols.length > 0){
      interval = setInterval(() => {
          allSymbols.forEach(async symbol => {
            try {
              const response = await axios.get(`/get-tweets-by-symbol?symbol=${symbol}`)
                if (response.status === 200){
                  const arrayForSymbol = tweets.filter(tweet => tweet.symbol === symbol);
                  if ( response.data.messages === arrayForSymbol){
                    return;
                  } else {
                    console.log("UPDATE")
                    const newTweets = [...response.data.messages , ...tweets ];
                    context.dispatch({
                      type: "UPDATE_TWEETS" , 
                      payload : newTweets
                      })
                    setTweets(newTweets);
                  }
  
                }
            }
            catch (error){
              console.log("ERROR")
            }
          })
  
        } , 10000)  }}

  const endInterval = () => {
    if (allSymbols.length > 0){
      return;
    }
    clearInterval(interval);
    interval = null;
  }
    
    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
            const newValue = event.currentTarget.value.toUpperCase();
            if (newValue.length > 5){
                return;
            }
            setCurrentSymbol(newValue);
    }

    const handleDeleteTag = (deletedSymbol: string) => {
      const newSymbols = allSymbols.filter(symbol => symbol !== deletedSymbol)
		  setAllSymbols(newSymbols);
      if (newSymbols.length < 1) {
        endInterval();
      }

		const newTweets = tweets.filter(tweet => tweet.symbol !== deletedSymbol);
			context.dispatch({
				type: "UPDATE_TWEETS" ,
				payload : [...newTweets]
			})
        setTweets([...newTweets])
                
        const newTweetCounter = tweetCounter.filter(counter => counter.symbol !== deletedSymbol);
        setTweetCounter(newTweetCounter);
    }

    const handleAddNewSymbol = async () => {
        setCompErrors([]);
        if (allSymbols.includes(currentSymbol)){
            setCompErrors([...compErrors , "repeat"])
            return;
        }
        if (currentSymbol.length > 2 && currentSymbol.length < 6){
            try{
							const response = await axios.get(`/get-tweets-by-symbol?symbol=${currentSymbol}`)
            	if (response.status === 200){
								const newTweets = [...response.data.messages , ...tweets ];
								context.dispatch({
								type: "UPDATE_TWEETS" , 
								payload : newTweets
										})
										setTweets(newTweets);
										setTweetCounter([...tweetCounter , {symbol : currentSymbol , mentions : response.data.messages.length}])
                    setAllSymbols([...allSymbols , currentSymbol ])
                    startInterval();
									}} 
							catch (error) {
								setCompErrors([...compErrors , "not200"])
							}
        }
        setCurrentSymbol("")
    }

    return (
        <SelectSymbolsDiv>
            <InputDiv>
                <SymbolInput type ="text" value={currentSymbol} onChange={(event:React.FormEvent<HTMLInputElement>) => {handleInputChange(event)}}/>
                <AddSymbolBtn href="" onClick={(event:React.MouseEvent<HTMLAnchorElement>) => {event.preventDefault(); handleAddNewSymbol();}}>
                    Add Symbol
                </AddSymbolBtn>
            </InputDiv>
            {
                compErrors.includes("repeat") && <FormError>You already added that symbol.</FormError>
            }
            {
                compErrors.includes("not200") && <FormError>Ops! Something went wrong. Try again.</FormError>
            }
						 {
                allSymbols.length > 0 && <TagsHeader>Tags You Have Selected:</TagsHeader>
            }
            <SymbolTagsDiv>
                {
                    allSymbols.length > 0 &&
                    allSymbols.map(symbol =>{
											const counter = tweetCounter.find(count => count.symbol === symbol)
                        return(
                            <TagDiv href="" onClick={(event:React.MouseEvent<HTMLAnchorElement>) => {event.preventDefault(); handleDeleteTag(symbol);}}>
                                <SymbolName>{symbol} <TweetCounter>{counter && counter.mentions} / 10</TweetCounter></SymbolName>
                            </TagDiv>
                        )
                    })
                }
            </SymbolTagsDiv>
        </SelectSymbolsDiv>
    )
}

export default SelectSymbols;