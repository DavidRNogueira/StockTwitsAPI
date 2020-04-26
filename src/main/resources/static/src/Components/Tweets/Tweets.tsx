import React , {FC, useContext} from "react"
import { Context } from "../../App";
import { 
    TweetsDiv,
    MessageDiv, 
    Avatar, 
    Username, 
    Body, 
    CreatedAt, 
    NoTweets, 
    UserDiv, 
    DateDiv, 
    TweetSymbol 
} from "./TweetsStyles";
import { ITweet } from "../../interfaces";

const Tweets:FC = ():JSX.Element => {
    const context = useContext(Context)

    return (
        <TweetsDiv>
            {
                context.state.length < 1 &&
                <NoTweets>No Tweets</NoTweets>
            }
            {
                context.state.length > 0 &&
                    context.state.map((tweet: ITweet) => {
                        return (
                            <MessageDiv key={tweet.id}>
                                <UserDiv>
                                    <Avatar src={tweet.user.avatar_url}/>
                                    <Username>@{tweet.user.username}</Username>
                                </UserDiv>
                                <Body>{tweet.body}</Body>
                                <DateDiv>
                                    <CreatedAt>{tweet.created_at}</CreatedAt>
                                    <TweetSymbol>{tweet.symbol}</TweetSymbol>
                                </DateDiv>
                            </MessageDiv>
                        )
                    })     
            }
        </TweetsDiv>
    )
}

export default Tweets;