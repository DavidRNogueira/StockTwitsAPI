export interface ITweet {
    symbol : string ,
    id : number ,
    body : string ,
    created_at: string , 
    user : {
      username: string,
      name:string,
      avatar_url : string
    }
  }

  export interface ActionInterface {
    type:any,
    payload:any
}

export interface ITweetCounter {
  symbol: string ,
  mentions : number
}
  