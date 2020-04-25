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
    FormError 
} from "./SelectSymbolsStyles";
import axios from "axios"
import { Context } from "../../App";

const SelectSymbols:FC = ():JSX.Element => {
		const context = useContext(Context);

    const [currentSymbol , setCurrentSymbol] = useState<string>("");
    const [allSymbols , setAllSymbols] = useState<string[]>(["ASDF"]);
    const [compErrors , setCompErrors] = useState<string[]>([]);
    const [tweets , setTweets] = useState<string[]>([]);
   
    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
            const newValue = event.currentTarget.value.toUpperCase();

            if (newValue.length > 5){
                return;
            }

            setCurrentSymbol(newValue);

    }

    const handleDeleteTag = (deletedSymbol: string) => {
        const newArray = allSymbols.filter(symbol => symbol !== deletedSymbol)
        setAllSymbols(newArray);
    }

    const handleAddNewSymbol = async () => {
        setCompErrors([]);
        if (allSymbols.includes(currentSymbol)){
            setCompErrors([...compErrors , "repeat"])
            return;
        }
        if (currentSymbol.length > 2 && currentSymbol.length < 6){
            setAllSymbols([...allSymbols , currentSymbol ])
            const response = await axios.get(`/get-tweets-by-symbol?symbol=${currentSymbol}`)
                if (response.status === 200){
									setTweets([...tweets , response.data]);
									context.dispatch({
										type: "UPDATE_TWEETS" , 
										payload : tweets
									})

									console.log(context.state);
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
        </SelectSymbolsDiv>
    )
}

export default SelectSymbols;