import History from './History';
import {useState} from 'react';
import './App.css'
import Alert from './Alert';

/* eslint-disable */
function App() {

  //Used in function 'handleAlert' to hide or show alerts
  const [showAlert, setShowAlert] = useState(false);
  const handleAlert = () => {
    setShowAlert(true);
  };

  //Used to keep track of entered math problem
  const [value,setValue] = useState('');

  //Used to keep track of how many times the bracket is called (later used in function 'bracket')
  const [bracketcalled,setBracketcalled] = useState(1);

  //local function that checks if the value ends with a number
  function endsWithNumeric(str) {
    const lastChar = str.charAt(str.length - 1);
    return str.endsWith(lastChar) && !isNaN(parseInt(lastChar));
  };

  /* 
     counts how many times 'bracket' is called through state
     if the count is even we add a closing bracket to the current input(value)
     - this is because if the function is called for example 2 times that means we have a full pair of brackets 
     if odd we add a opening bracket
     - we also call the endswithnumberic function to add a '*' sign if the user opens a bracket next to a number
  */
  const bracket = (e) => {
    setBracketcalled(bracketcalled+1)
    if(bracketcalled%2 === 0){
      setValue(value + ')')
    }else{
      if (endsWithNumeric(value)){
        setValue(value + '*' + '(')
      }
      else{   
      setValue(value+'(')
      }
    }
  };

  //resets 'value' and sets the 'Bracketcalled' back to 1
  const clear = (e) =>{
    setValue('');
    setBracketcalled(1);
  };

  //removes the last entered digit/operator. subtracts 1 from 'bracketcalled' to keep the count of opening and cloing brackets in check.
  const remove = (e) => {
    if (value.endsWith(')')||value.endsWith('(')) {
      setBracketcalled(bracketcalled-1)
    }
    setValue(value.slice(0,-1))
  };

  //Used to keep track of history of the previous results (used in function 'viewhistory' )
  const [history,setHistory] = useState([]);

  //calculates the result and adds it to 'history' list. uses try-catch since eval might produce an error for incorrect input
  const calculate = (e) => {
    try {
      let result = String(eval(value)); //converted to string so that the 'clear' function can use the endsWith function if user presses delete.
      let newhistory = value+"="+result;
      setHistory([...history,newhistory]);
      setValue(result);
    } 
    catch (error) {
      setValue("error")
    };  
  };

  //used to see if the historyview is toggled on or off by the user
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  //sets the value of isHistoryVisible when called
  function handleToggleSideContainer() {
    setIsHistoryVisible((prevVisibility) => !prevVisibility);
  };

  //prints the history by calling the History component, returns'NO history' if 'history' list is empty
  function viewHistory(listItems) {
    return (
      <>
      <History listItems={listItems}/>
      {listItems.length === 0 && <p className='history'>No history</p>}
      </>
    );
  };
  //Used to change color of the svg elements (used in function 'changecolor')
  const [svgcolor,setSvgcolor] = useState('#000');

  //changes the theme by changing values of css variables
  const changeColors = (e) => {
    var color = []
    switch(e.target.value){
      case "LIGHTS OUT":
        color =['rgb(20, 20, 20)','rgb(62, 62, 62)','white','#888'];
        setSvgcolor('white');
        break;
      case "DEFAULT":
        color =['rgb(228, 228, 228)','white','black','#888'];
        setSvgcolor('black');
        break;
      case "PRETTY":
        color =['#FFEEF4','white','#ff5297','#FFC0D9'];
        setSvgcolor('#ff5297');
        break;
      case "WOODY":
        color =['#F8F4E1','#AF8F6F','#322C2B','#524846'];
        setSvgcolor('#322C2B');
        break;
      default :
        color = ['']
    }
      document.documentElement.style.setProperty('--primary-color', color[0]);
      document.documentElement.style.setProperty('--secondary-color', color[1] );
      document.documentElement.style.setProperty('--text-color', color[2] );
      document.documentElement.style.setProperty('--subtext-color', color[3] );
    };
   
    //handles user input
    const userInput = (e) =>{
      setValue(e.target.value)
    }
    const handleKeyDown = (event) =>{
      if (event.key == "Enter"){
        calculate();
        event.preventDefault();
      }
    } 


  return (
    <>
    <div className="container">
      <div className="calculator">
      <form>
          {isHistoryVisible && viewHistory(history)}
          <div className="display">
            <input type="text" value={value} wrap="soft" onChange={userInput} onKeyDown={handleKeyDown}/>
          </div>
        <div className="special-row">
          <input className="special-keys"type="button" value="HISTORY" onClick={handleToggleSideContainer} />
          <svg className="special-keys" width="40px" height="20px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleAlert}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.5 4C0.223858 4 0 4.22386 0 4.5V10.5C0 10.7761 0.223858 11 0.5 11H14.5C14.7761 11 15 10.7761 15 10.5V4.5C15 4.22386 14.7761 4 14.5 4H0.5ZM1 10V5H2.075V7.5C2.075 7.73472 2.26528 7.925 2.5 7.925C2.73472 7.925 2.925 7.73472 2.925 7.5V5H4.075V6.5C4.075 6.73472 4.26528 6.925 4.5 6.925C4.73472 6.925 4.925 6.73472 4.925 6.5V5H6.075V6.5C6.075 6.73472 6.26528 6.925 6.5 6.925C6.73472 6.925 6.925 6.73472 6.925 6.5V5H8.075V7.5C8.075 7.73472 8.26528 7.925 8.5 7.925C8.73472 7.925 8.925 7.73472 8.925 7.5V5H10.075V6.5C10.075 6.73472 10.2653 6.925 10.5 6.925C10.7347 6.925 10.925 6.73472 10.925 6.5V5H12.075V6.5C12.075 6.73472 12.2653 6.925 12.5 6.925C12.7347 6.925 12.925 6.73472 12.925 6.5V5H14V10H1Z"
            fill={svgcolor}
          />
          </svg>
          {showAlert && (<Alert message="This Feature is currently under construction!" onClose={() => setShowAlert(false)} />)}
          <input className="special-keys"type="button" value="ADVANCED" onClick={handleAlert} />
          {showAlert && (<Alert message="This Feature is currently under construction!" onClose={() => setShowAlert(false)} />)}
          <input className="special-keys" type="button" value="DELETE" onClick={remove} />
        </div>
        <div className="buttons">
            <div>
            <input className="keys" type="button" value="C" onClick={clear}/>
            <input className="keys" type="button" value="()" onClick={bracket}/>
            <input className="keys" type="button" value="%" onClick={e => setValue(value +'%')}/>
            <input className="keys" type="button" value="/" onClick={e => setValue(value +e.target.value)}/>
            </div>
            <div>
            <input className="keys" type="button" value="7" onClick={e => setValue(value +e.target.value)}/>
            <input className="keys" type="button" value="8" onClick={e => setValue(value +e.target.value)}/>
            <input className="keys" type="button" value="9" onClick={e => setValue(value +e.target.value)}/>
            <input className="keys" type="button" value="X" onClick={e => setValue(value + '*')}/>
            </div>
            <div>
            <input className="keys" type="button" value="4" onClick={e => setValue(value +e.target.value)}/>
            <input className="keys" type="button" value="5" onClick={e => setValue(value +e.target.value)}/>
            <input className="keys" type="button" value="6" onClick={e => setValue(value +e.target.value)}/>
            <input className="keys" type="button" value="-" onClick={e => setValue(value +e.target.value)}/>
            </div>
            <div>
            <input className="keys" type="button" value="1" onClick={e => setValue(value +e.target.value)}/>
            <input className="keys" type="button" value="2" onClick={e => setValue(value +e.target.value)}/>
            <input className="keys" type="button" value="3" onClick={e => setValue(value +e.target.value)}/>
            <input className="keys" type="button" value="+" onClick={e => setValue(value +e.target.value)}/>
            </div>
            <div>
            <input className="keys" type="button" value="00" onClick={e => setValue(value +e.target.value)}/>
            <input className="keys" type="button" value="0" onClick={e => setValue(value +e.target.value)}/>
            <input className="keys" type="button" value="." onClick={e => setValue(value +e.target.value)}/>
            <input className="keys" type="button" value="=" onClick={calculate}/>
            </div>
        </div>
      </form>
      
      </div>
      
    </div>
    <div className='footer'>
        <input className='footer-keys' type="button" value="LIGHTS OUT" onClick={changeColors}/>
        <input className='footer-keys' type="button" value="PRETTY" onClick={changeColors}/>
        <input className='footer-keys' type="button" value="WOODY" onClick={changeColors}/>
        <input className='footer-keys' type="button" value="DEFAULT" onClick={changeColors}/>
      </div>
  </>
  );
}

export default App;
