import React , {FC, useState, useContext} from "react";
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
    TweetCounterHeader,
    TweetCounterList,
    TweetCounterItem,
    TweetCounterDiv
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
   
    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
            const newValue = event.currentTarget.value.toUpperCase();

            if (newValue.length > 5){
                return;
            }

            setCurrentSymbol(newValue);

    }

    const handleDeleteTag = (deletedSymbol: string) => {
        console.log(context.state)
        const newSymbols = allSymbols.filter(symbol => symbol !== deletedSymbol)
		setAllSymbols(newSymbols);

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
            const response = await axios.get(`/get-tweets-by-symbol?symbol=${currentSymbol}`)
              if (response.status === 200){
				const newTweets = [...tweets , ...response.data.messages];
				context.dispatch({
				    type: "UPDATE_TWEETS" , 
				    payload : newTweets
                })
                setTweets(newTweets);
                setTweetCounter([...tweetCounter , {symbol : currentSymbol , mentions : response.data.messages.length}])
                setAllSymbols([...allSymbols , currentSymbol ])
              } 
              // not working
              if (response.status !== 200){
                  setCompErrors([...compErrors , "not200"])
              }
        }
        setCurrentSymbol("")
    }

    return (
        <SelectSymbolsDiv>
            {
                allSymbols.length > 0 && <TagsHeader>Tags You Have Selected:</TagsHeader>
            }
            <SymbolTagsDiv>
                {
                    allSymbols.length > 0 &&
                    allSymbols.map(symbol =>{
                        return(
                            <TagDiv href="" onClick={(event:React.MouseEvent<HTMLAnchorElement>) => {event.preventDefault(); handleDeleteTag(symbol);}}>
                                <SymbolName>{symbol}</SymbolName>
                            </TagDiv>
                        )
                    })
                }
            </SymbolTagsDiv>
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
                tweetCounter.length > 0 &&
                <TweetCounterDiv>
                    <TweetCounterHeader>Mentions</TweetCounterHeader>
                    <TweetCounterList>
                        {
                            tweetCounter !== [] &&
                            tweetCounter.map(counter => {
                                return <TweetCounterItem>{counter.symbol} : {counter.mentions} / 10</TweetCounterItem>
                            })
                        }
                    </TweetCounterList>
                </TweetCounterDiv>
            }
        </SelectSymbolsDiv>
    )
}

export default SelectSymbols;