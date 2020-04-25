import React , {FC , useContext , useReducer} from 'react';
import SelectSymbols from './Components/SelectSymbols/SelectSymbols';
import { ITweet, ActionInterface } from './interfaces';

const initState:(string|number)[] = []
export const Context = React.createContext<any>(initState);
  
const reducer = (state:ITweet, action:ActionInterface) => {
  const {type, payload} = action;
  
  switch (type){
      case "UPDATE_TWEETS":
          return {...payload}
      default:
          return initState;
  }
}

const App:FC = ():JSX.Element => {
  const [state,dispatch] = useReducer(reducer, initState)

  return (
    <Context.Provider value={{state , dispatch}}>
      <h1 className="pageHeader">StockTwits API Challenge</h1>
      <SelectSymbols/>
    </Context.Provider>
  )
}

export default App;
