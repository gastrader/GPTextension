import React, { useState, useEffect } from 'react';
import logo from '../../assets/img/logo.svg';
import copy from '../../assets/img/copy.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

import { Configuration, OpenAIApi } from "openai";

const Popup = () => {
  const [apiKey, setApiKey] = useState(""); //get API key

  const [response, setResponse] = useState(""); //get response
  const [openai, setopenai] = useState("")
  const [prompt, setPrompt] = useState(function () {
    chrome.storage.local.get(['prompt']).then(({ prompt }) => {
      setPrompt(prompt)
    })
  });
  const copyToClipboard = () => {
    const textarea = document.getElementById("response");
    textarea.select();
    navigator.clipboard.writeText(textarea.value);
  }


  useEffect(() => {
    const configuration = new Configuration({
      apiKey: apiKey,
    });
    const api = new OpenAIApi(configuration);
    setopenai(api);
    console.log("redid the config openai looking ass");
  }, [apiKey])

  //get ApiKey from storage
  useEffect(() => {
    chrome.storage.local.get(['openaiApiKey']).then(({ openaiApiKey }) => {
      setApiKey(openaiApiKey);

    })
  }, []);

  useEffect(() => {
    chrome.storage.local.get(['prompt']).then(({ prompt }) => {
      setPrompt(prompt)
    })
  }, [])

  chrome.runtime.onMessage.addListener(function (message) {
    setPrompt(message.selectionText);
    chrome.storage.local.set({ prompt: message.selectionText })
    console.log("Message received was: " + message.selectionText)
  });

  async function handleSubmitReply() {
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages:
          [{
            "role": "system", "content": "Take this email as the only context, respond to every email with 'Hello [name],' use the name of the person who emailed me if available, otherwise \
          leave the [name] blank, end each email with 'Cheers, Gavin' tag on a new line. Please respond to the email saying thank you in a professional manner. " + prompt
          }],
        max_tokens: 150,
        temperature: 0.5,
      });
      setResponse(completion.data.choices[0].message.content.slice(2));
      console.log(completion.data.choices[0].message)

    } catch (e) {
      alert("API Key Not Working: ", e);

    }

  };

  async function handleSubmitQA() {
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages:
          [{
            "role": "system", "content": "Please answer this question. If the prompt I give you is not question just say 'Please re-select text in the format of a question.' " + prompt
          }],
        max_tokens: 150,
        temperature: 0.2,
      });
      setResponse(completion.data.choices[0].message['content']);
      console.log(completion.data.choices[0].message)

    } catch (e) {
      alert("API Key Not Working: ", e);

    }

  };
  async function handleSubmitTLDR() {
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages:
          [{
            "role": "system", "content": "Given only this prompt can you please give me a TL;DR in 3 bullet points or less." + prompt
          }],
        max_tokens: 150,
        temperature: 0.2,
      });
      setResponse(completion.data.choices[0].message.content.slice(2));
      console.log(completion.data.choices[0].message)

    } catch (e) {
      alert("API Key Not Working: ", e);

    }

  };

  async function handleSubmitPro() {
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages:
          [{ "role": "system", "content": "Take this prompt and make it more professional" + prompt }],
        max_tokens: 150,
        temperature: 0.5,
      });
      setResponse(completion.data.choices[0].message.content.slice(2));
      console.log(completion.data.choices[0].message)

    } catch (e) {
      alert("API Key Not Working: ", e);

    }

  };

  return (
    <div className="App">
      <header className='App-header'>
        <form>
          <div className='mb-3'>
            <img src={logo} alt="Logo" className="App-logo" />
            <label htmlFor='apiKey' className='form-label'>

              API Key
            </label>
            <input type="text" className='form-control' id="apiKey" name="apiKey" placeholder='OpenAI API Key' value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                chrome.storage.local.set({ openaiApiKey: e.target.value });
              }} />
            <div id="apiKeyHelp" className='form-text'> Obtain API Key from OpenAI profile.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="highlightedText" className="form-label">
              Selected Text
            </label>
            <div className='textarea-container'>
              <textarea className='form-control' id="prompt" name="prompt" placeholder='Selected Text' value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  chrome.storage.local.set({ prompt: e.target.value })
                }} />
              <button type="button"
                id="getSelected"
                className='btn-padded'
                onClick={() => handleSubmitPro()}>
                <svg fill="#61DBFB" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>message-processing</title><path d="M17,11H15V9H17M13,11H11V9H13M9,11H7V9H9M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2Z" /></svg>
              </button>
              <button type="button"
                id="getReply"
                className='btn-padded'
                onClick={() => handleSubmitReply()}>
                <svg fill="#61DBFB" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>reply</title><path d="M10,9V5L3,12L10,19V14.9C15,14.9 18.5,16.5 21,20C20,15 17,10 10,9Z" /></svg>
              </button>
              <button type="button"
                id="getTLDR"
                className='btn-padded'
                onClick={() => handleSubmitTLDR()}>
                <svg fill="#61DBFB" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>TLDR</title><path d="M18.05,21L15.32,16.26C15.32,14.53 14.25,13.42 12.95,13.42C12.05,13.42 11.27,13.92 10.87,14.66C11.2,14.47 11.59,14.37 12,14.37C13.3,14.37 14.36,15.43 14.36,16.73C14.36,18.04 13.31,19.11 12,19.11H15.3V21H6.79C6.55,21 6.3,20.91 6.12,20.72C5.75,20.35 5.75,19.75 6.12,19.38V19.38L6.62,18.88C6.28,18.73 6,18.5 5.72,18.26C5.5,18.76 5,19.11 4.42,19.11C3.64,19.11 3,18.47 3,17.68C3,16.9 3.64,16.26 4.42,16.26L4.89,16.34V14.37C4.89,11.75 7,9.63 9.63,9.63H9.65C11.77,9.64 13.42,10.47 13.42,9.16C13.42,8.23 13.62,7.86 13.96,7.34C13.23,7 12.4,6.79 11.53,6.79C11,6.79 10.58,6.37 10.58,5.84C10.58,5.41 10.86,5.05 11.25,4.93L10.58,4.89C10.06,4.89 9.63,4.47 9.63,3.95C9.63,3.42 10.06,3 10.58,3H11.53C13.63,3 15.47,4.15 16.46,5.85L16.74,5.84C17.45,5.84 18.11,6.07 18.65,6.45L19.1,6.83C21.27,8.78 21,10.1 21,10.11C21,11.39 19.94,12.44 18.65,12.44L18.16,12.39V12.47C18.16,13.58 17.68,14.57 16.93,15.27L20.24,21H18.05M18.16,7.74C17.63,7.74 17.21,8.16 17.21,8.68C17.21,9.21 17.63,9.63 18.16,9.63C18.68,9.63 19.11,9.21 19.11,8.68C19.11,8.16 18.68,7.74 18.16,7.74Z" /></svg>
              </button>
              <button type="button"
                id="getQA"
                className='btn-padded'
                onClick={() => handleSubmitQA()}>
                <svg fill="#61DBFB" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Q&A</title><path d="M12 3C6.5 3 2 6.6 2 11C2 13.1 3 15.1 4.8 16.5C4.8 17.1 4.4 18.7 2 21C2 21 5.5 21 8.5 18.5C9.6 18.8 10.8 19 12 19C17.5 19 22 15.4 22 11S17.5 3 12 3M13 15H11V13H13V15M14.8 10C14.5 10.4 14.1 10.6 13.7 10.8C13.4 11 13.3 11.1 13.2 11.3C13 11.5 13 11.7 13 12H11C11 11.5 11.1 11.2 11.3 10.9C11.5 10.7 11.9 10.4 12.4 10.1C12.7 10 12.9 9.8 13 9.6C13.1 9.4 13.2 9.1 13.2 8.9C13.2 8.6 13.1 8.4 12.9 8.2C12.7 8 12.4 7.9 12.1 7.9C11.8 7.9 11.6 8 11.4 8.1C11.2 8.2 11.1 8.4 11.1 8.7H9.1C9.2 8 9.5 7.4 10 7C10.5 6.6 11.2 6.5 12.1 6.5C13 6.5 13.8 6.7 14.3 7.1C14.8 7.5 15.1 8.1 15.1 8.8C15.2 9.2 15.1 9.6 14.8 10Z" /></svg>
              </button>


            </div>
          </div>

          {response &&
            <div className="mb-3">
              <label htmlFor="response" className="form-label">
                Output
              </label>
              <div className='textarea-output'>
                <textarea className='form-control' rows="4" cols="25" id="response" name="response" placeholder='Output Text' value={response} readOnly />
                <button id="copy-icon" onClick={copyToClipboard}>
                  <svg id="search-icon" class="search-icon" viewBox="0 0 24 24">
                    <svg fill="black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Copy</title><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" /></svg>
                  </svg>
                </button>

              </div>

            </div>
          }

        </form>
      </header>
    </div>

  );
}


export default Popup;
