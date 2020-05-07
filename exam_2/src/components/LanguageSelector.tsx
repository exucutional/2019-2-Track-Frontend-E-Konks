import React from 'react';
import { Tabs, Tab} from 'react-bootstrap';
import * as T from '../types/Types';

const LanguageSelector: React.FunctionComponent<T.IInputLanguage> = props => {
    return (
        <Tabs
          id="controlled-tab-example"
          activeKey={props.lang}
          onSelect={(lang: string) => {props.setLang(lang)}}
        >
          <Tab eventKey="ru" title="Русский">
          </Tab>
          <Tab eventKey="en" title="English">
          </Tab>
        </Tabs>
    );
}

export default LanguageSelector;