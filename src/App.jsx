
import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  let [password, setPassword] = useState("");
  let [passLength, setPassLength] = useState(16);
  let [allowNumber, setAllowNumber] = useState(false);
  let [allowCharacter, setAllowCharacter] = useState(false);


  let passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (allowNumber) {
      str += "0123456789";
    }
    if (allowCharacter) {
      str += "!@#&$";
    }
    for (let i = 0; i < passLength; i++) {
      let iChar = Math.floor(Math.random() * str.length + 1);
      if (str[iChar] === undefined) {
        i--;
        continue;
      }
      pass += str[iChar];

    }
    setPassword(pass);
  }, [passLength, allowCharacter, allowNumber, setPassword])

   useEffect(()=>{
     passwordGenerator();
   }, [passLength, allowCharacter, allowNumber, setPassword])
  
  let passRefrence = useRef(null);
   let copyPassword = ()=>{
       passRefrence.current?.select();
       window.navigator.clipboard.writeText(password);
   }

  let clickMe = () =>{
    window.open("https://github.com/rupammishraop");
  }

  return (
    <>
      <div className="container">
        <div className="passGenApp">
          <div className='passInput'>
            <h1>Password Generator</h1>
            <div className='developerClick'>
                 <img src="/src/github.png" alt=""
                   onClick={clickMe} 
                 />
                 <h3>Click Me</h3>
            </div>
            <div className='inputBox'>
              <input type="text"
                placeholder='Password'
                spellCheck="false"
                value={password}
                ref={passRefrence}
                readOnly
              />
              <button
              onClick={copyPassword}
              >Copy</button>
            </div>
          </div>
          <div className="changesBox">
            <div className="change">
              <div className='length'>
                <input type="range" 
                 min={8}
                 max={16}
                 onChange={(e)=> setPassLength(e.target.value)}
                />
                <label htmlFor="">Length {passLength}</label>
              </div>
              <div className='number'>
                <input type="checkbox"
                   onChange={()=>setAllowNumber((prev) => (!prev))}
                />
                <label htmlFor="">Number</label>
              </div>
              <div className='character'>
                <input type="checkbox" 
                
                onChange={()=>setAllowCharacter((prev) => (!prev))}/>
                <label htmlFor="">Character</label>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
