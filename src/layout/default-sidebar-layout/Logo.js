import React, {Component} from 'react';
import styled from 'styled-components';

const LogoContainer = styled.img`
  height: 30px;
  width: auto;
`

export default function Logo(props){
    return <LogoContainer src="/images/logo.png"/>
}