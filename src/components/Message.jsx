import React, { useState, useEffect, useContext, useRef } from "react";

function Message({ contract, account }) {
  
  const [data, setData] = useState('')
  const [ blockData, setBlockData ] = useState('')


  const handleInputChange = (event) => {
    setData({
        ...data,
        [event.target.name] : event.target.value
    })
    }

  const setMessage = async (event) => {

    event.preventDefault();

    // console.log( data.msg );

    try {
      await contract.methods
        .setMessage(data.msg ) // function from the contract 
        .send({ from: account }) // send the message
        .then(function (tx) { // perform action after the message has been sent
          
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getMessage = async () => {
    await contract.methods
      .getMessage()
      .call()
      .then(function (tx) {
        setBlockData(tx);
      });
  };

  return (
    <div className="box">

     <form onSubmit={setMessage}>

      <div className="columns">
        
          <div className="column is-four-fifths">
            <div className="field">
              <input
                className="input is-primary"
                type="text"
                name="msg"
                placeholder="Write your message"
                onChange={handleInputChange} 
              />
            </div>
          </div>
          <div className="column is-one-fifths">
                <input type='submit' className="button is-normal is-primary" value='Send Message' />
              
          </div>
        </div>
        </form>
    <div className="columns">
        <div className="column is-four-fifths">
          
            <p className="retrieve-message">
               Your message in the blockchain is:  <span className="has-text-primary">{blockData}</span> 
            </p>
          
        </div>
        <div className="column is-one-fifths">
          
              <button className="button is-normal py-10 is-primary" onClick={getMessage}>
                Get Message
              </button>
        </div>
      </div>
    </div>
  );
}

export { Message };
