import styled from "styled-components"

export const TweetsDiv = styled.div `
width:80%;
margin:auto;

display:flex;
flex-direction:column;
align-items:center;
`

export const MessageDiv = styled.div `
width:70%;
border-radius:10px;
margin:0.5em;
padding:1em;
display:flex;
flex-direction:row;
justify-content:space-evenly;
align-items:center;
`

export const Username = styled.strong `

`

export const CreatedAt = styled.i `

`

export const Name = styled.strong `

`

export const Body = styled.p `
width:60%;
`

export const Avatar = styled.img `
border-radius:30px;
margin:0.5em;
`

export const NoTweets = styled.h1 `
text-align:center;
`

export const TweetSymbol = styled.strong `
align-self:flex-end;
background-color:lightgrey;
padding:0.5em;
border-radius:10px;
`

export const DateDiv = styled.div `
display:flex;
flex-direction:column;
justify-content:space-between;
justify-self:flex-end;
`

export const UserDiv = styled.div `
display:flex;
flex-direction:column;
align-items:center;
margin-right: 1.5em;
`