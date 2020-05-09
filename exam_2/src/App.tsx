import { translate } from './translate';
import React, { ReactHTMLElement, useEffect, useState} from 'react';
import styled, { StyledComponent } from '@emotion/styled';
import TextField from './components/TextField';
import LanguageSelector from './components/LanguageSelector';
import './App.css';

const Container: StyledComponent<any, ReactHTMLElement<HTMLDivElement>, HTMLDivElement> = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;
    justify-content: center;
`;

const Topic: StyledComponent<any, ReactHTMLElement<HTMLDivElement>, HTMLDivElement> = styled.div`
    display: flex;
    align-self: center;
    font: normal 60px monospace;
    color: lightgrey;
    justify-content: center;
    padding: 20px;
    padding-left: 50px;
    padding-right: 50px;
`;

const LanguageContainer: StyledComponent<any, ReactHTMLElement<HTMLDivElement>, HTMLDivElement> = styled.div`
    display: flex;
    flex-direction: column;
    width: -webkit-fill-available;
`;

function App() {
    const [text, setText] = useState('');
    const [translation, setTranslation] = useState('');
    const [lang, setLang] = useState('en');
    const [outlang, setOutlang] = useState('ru');

    useEffect(() => {
        if (text) {
            translate({
                lang: outlang,
                text: text,
            })
            .then((result) => {
                setTranslation(result);
            })
        }
    }, [text, outlang, lang]);

    return (
        <div>
            <Topic>TechoTrack Translate</Topic>
            <Container>
                <LanguageContainer>
                    <LanguageSelector lang={lang} setLang={setLang}/>
                    <TextField text={text} setText={setText}/>
                </LanguageContainer>
                <LanguageContainer>
                    <LanguageSelector lang={outlang} setLang={setOutlang}/>
                    <TextField text={translation} setText={setTranslation}/>
                </LanguageContainer>
            </Container>
        </div>
    );

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
