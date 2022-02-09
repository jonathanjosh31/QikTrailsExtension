import logo from './logo.svg';
import mainLogo from './mainlogo.svg';
import './App.css';
import React, {useEffect,useState} from 'react';
import { Button,Grid } from '@mui/material';
import { db } from './firebase';
import { motion } from "framer-motion";

function App() {

  const[url,setUrl] = useState<string>('');
  const[domainName,setDomainName] = useState<string>('');
  const[userName,setUserName] = useState<string>('');
  const[password,setPassword] = useState<string>('');
  const[tabs,setTabs] = useState<any>({});
  const[isButtonClick,setIsButtonClick] = useState<boolean>(false);
  const[credentials,setCredentials] = useState<any>(null);
  const[isLoginAvail, setLoginAvail]=useState<boolean>(false)

  useEffect( () => {

    let temp:string = '';
    const queryInfo = {active:true, lastFocusedWindow: true};
    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      const chromeUrl:string = tabs[0].url!;
      setUrl(chromeUrl);
      temp = new URL(chromeUrl).hostname;
      setDomainName(temp);
      //setUserName(temp + Math.floor((Math.random() * 999) + 1).toString());
      //setPassword(Math.random().toString(36).slice(2));
      setTabs(tabs[0]);
      var docRef = db.collection("Credentials").doc(temp);

      docRef.get().then((doc) => {
        if (doc.exists){
          setCredentials(doc.data());
        }
        else{
          setCredentials("No such Data!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });

      console.log(chromeUrl)
      if(chromeUrl.includes("login") || chromeUrl.includes('log-in') || chromeUrl.includes('signin') || chromeUrl.includes('sign-in') || chromeUrl.includes('sign-up')){
        setLoginAvail(true)
        console.log(isLoginAvail)
      }
    });

  }, []);

  const sendData = () =>{
      console.log(tabs)
      setIsButtonClick(true);
      setUserName(credentials.username);
      setPassword(credentials.password);
      chrome.tabs.sendMessage( tabs.id,{ username:credentials.username,password:credentials.password},(response) => {
         console.log(response.status);
     })
  }

//  eslint-disable-next-line @typescript-eslint/no-unused-vars
  // let domainName = (new URL(url));

  return (
    <div className="App">
      <header className="App-header">
        <motion.img 
         animate={{
          rotate: [ 0, 360, 0],
        }}

        transition = {{
          repeat : Infinity
        }}
        
        src={mainLogo} className="App-logo"  alt="logo" />
        <br>
        </br>
        <h2> CRED PROVIDER</h2>
        
        <p>
          Domain : {domainName}
        </p>
        { isButtonClick && <p> Username : {userName}</p> }
        { isButtonClick && <p> Password : {password}</p>}
        { !isLoginAvail && <h3> Oops, we can't do anything here!</h3>}
        { isLoginAvail  && <h5>Do you want us to fill in the credentials?</h5>}
        {isLoginAvail && (       <Grid container spacing={2}>
          <Grid item xs={6}>
          <Button variant='contained' onClick={ sendData }>Yes</Button>
          </Grid>
          <Grid item xs={6}>
          <Button variant='contained'>No</Button>
          </Grid>
        </Grid>)}
 
          { isButtonClick && (<p>success</p>)}
      </header>
    </div>
  );
}

export default App;
