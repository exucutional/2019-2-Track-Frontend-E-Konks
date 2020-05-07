import React, { ReactHTMLElement, SyntheticEvent, ChangeEvent} from 'react';
import styled, { StyledComponent } from '@emotion/styled';
import { Form } from 'react-bootstrap';
import * as T from '../types/Types';

const Wrapper: StyledComponent<any, ReactHTMLElement<HTMLDivElement>, HTMLDivElement> = styled.div`
    display: flex;
    margin: 10px;
    width: -webkit-fill-available;
`;

const TextField: React.FunctionComponent<T.IInputTextProps> = props => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setText(event.target.value);
    };
    return <Wrapper>
        <Form.Control as="textarea" rows={5} placeholder="Введите текст" onChange={onChange} value={props.text}/>
    </Wrapper>
}

export default TextField;
