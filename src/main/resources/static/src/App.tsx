import React , {FC , useReducer} from 'react';
import SelectSymbols from './Components/SelectSymbols/SelectSymbols';
import { ITweet, ActionInterface } from './interfaces';
import Tweets from './Components/Tweets/Tweets';

const initState:(string|number)[] = []
export const Context = React.createContext<any>(initState);
  
const reducer = (state:ITweet, action:ActionInterface) => {
  const {type, payload} = action;
  
  switch (type){
      case "UPDATE_TWEETS":
          return [...payload]
      default:
          return state;
  }
}

const App:FC = ():JSX.Element => {
  const [state,dispatch] = useReducer<any>(reducer, initState)

  return (
    <Context.Provider value={{state , dispatch}}>
      <h1 className="pageHeader">StockTwits API Challenge</h1>
      <SelectSymbols/>
      <Tweets/>
    </Context.Provider>
  )
}

export default App;
