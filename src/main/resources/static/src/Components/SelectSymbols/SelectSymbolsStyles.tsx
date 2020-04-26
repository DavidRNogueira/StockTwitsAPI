import styled from "styled-components";
import { GLOBAL_RED, PRIMARY_GREY } from "../../constants";

export const SelectSymbolsDiv = styled.div `
display:flex;
flex-direction:column;
`

export const InputDiv = styled.div `
display:flex;
flex-direction:row;
align-self:center;
justify-content:center;
`

export const SymbolInput = styled.input `
font-size:24px;
width:40%;
text-align:center;
`

export const AddSymbolBtn = styled.a `
display:flex;
align-items:center;
justify-content:center;
text-decoration:none;
color:white;
background-color: #035aa6;
padding: 0.25em 0.5em 0.25em 0.5em;
margin-left:1em;
border-radius:10px;
`

export const TagsHeader = styled.h1 `
font-size:2em;
margin:0;
`

export const SymbolTagsDiv = styled.div `
display:flex;
flex-direction:row;
flex-wrap:wrap;
`

export const TagDiv = styled.a `
color:black;
text-decoration:none;
background-color:${PRIMARY_GREY};
padding:0.5em;
border-radius:10px;
margin:1em;

:hover {
    background-color:${GLOBAL_RED};
}
`

export const SymbolName = styled.h3 `
margin:0;
font-size:2em;
`

export const FormError = styled.strong `
color:red;
font-size:1em;
text-align:center;
margin-top:0.5em;
`

export const TweetCounter = styled.i `
font-size:0.75em;
color:grey;
`