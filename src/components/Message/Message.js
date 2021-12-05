import React from 'react'
import Sidebar from "./Left/Sidebar";
import styled from "styled-components";
import Chat from "./Right/Chat";

const Message = () => {
    return (
        <Messages>
            {/*<h1>Я главная страница сообщения!!!</h1>*/}
            <Sidebar/>
            <Chat/>
        </Messages>
    )
}


export default Message


const Messages = styled.div`
  display: flex;
`