export interface ITweet {
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
  