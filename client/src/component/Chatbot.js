import React, { useEffect } from 'react'
import Axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'

const Chatbot = () =>{

    useEffect(()=>{
        eventQuery('WelcomeEvent')
    },[])
    
    const textQuery = async (text) =>{

            let talk = {
                who: 'user',
                content:{
                    text: {
                        text: text
                    }

                }
            }
            console.log("text I sent", talk);
            
        const textQueryVariable = {
            text
        }
        try {
           const response = await Axios.post('http://localhost:5000/api/dialogflow/textQuery', textQueryVariable );
           const content = response.data.fulfillmentMessages[0];
           let talk = {
               who: "Chatbot",
               content: content
           }

           
          

        } catch (error) {
            let talk = {
                who: 'Chatbot',
                content:{
                    text: {
                        text: "Unknown error occured."
                    }

                }
            }
        
            
        }

    }
    const eventQuery = async (event) => {

    const eventQueryVariable = {
        event
    }
    try {
       const response = await Axios.post('http://localhost:5000/api/dialogflow/eventQuery', eventQueryVariable );
       const content = response.data;
       
       let talk = {
           who: "Chatbot",
           content: content
       }

       console.log(content);
       
      

    } catch (error) {
        let talk = {
            who: 'Chatbot',
            content:{
                text: {
                    text: "Unknown error occured."
                }

            }
        }
    
        
    }

    }
    const keyPressHandle = (event) =>{
        if(event.key === 'Enter'){
            if(!event.target.value){
                alert("you need to type something")
            }

            textQuery(event.target.value);
        }
    }

    return (
        <div style ={{height: 700, width: 700, border: '3px solid black', borderRadius: '7px'}}>
            <div style= {{height: 644, width: '100%', overflow: 'auto'}}> </div>


            <input style={{margin: 0, width: '100%', height:50, 
                            borderRadius:'4px', padding:'5px',fontSize:'1rem'}}
                            placeholder="Send a message..."
                            type="text"
                            onKeyPress={keyPressHandle}>

            </input>
        </div>
    )

}


export default Chatbot;