import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import {Avatar} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {setChat} from "../../../../features/chatSlice";
import db from "../../../../firebase";
import * as timeago from "timeago.js";



const SidebarChat = ({id, chatName}) => {
    const dispatch = useDispatch()
    const [chatInfo, setChatInfo] = useState([]);


    useEffect(() => {
        db.collection("chats")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
                setChatInfo(snapshot.docs.map((doc) => doc.data()))
            )
    }, [id]);


    const handleMessage = () => {
        dispatch(
            setChat({
                chatId: id,
                chatName: chatName
            })
        )
    }


    return (
        <SidebarChats onClick={handleMessage}>
            <Avatar src={chatInfo[0]?.photo}/>
            <ChatInfo>
                <h3>{chatName}</h3>
                <p>{chatInfo[0]?.message}</p>
                <small>
                    {/*{new Date(chatInfo[0]?.timestamp?.toDate()).toLocaleTimeString()}*/}
                    {timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}

                </small>
            </ChatInfo>
        </SidebarChats>
    )
}

export default SidebarChat

const SidebarChats = styled.div`

  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #040307;
  //box-shadow: rgb( 0 0 0/ 69%) 0 26px 30px -10px,
  //rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  //transition: all 350ms cubic-bezier(0.25s 0.46s 0.45s 0.94s) 0s;
;

  &:hover {
    background: #3F3D43;
    color: white;
    transform: scale(1.00);
    box-shadow: rgb(0 0 0 / 30%) 0px 40px 58px -16px,
    rgb(0 0 0 / 12%) 0px 30px 22px -10px;
  }
  
`
const ChatInfo = styled.div`
  margin-left: 15px;
  position: relative;
  width: 100%;


  small {
    position: absolute;
    top: 5px;
    right: 0;

  }
  
  p{
    overflow-wrap: break-word;
    hyphens: auto;
    width: 140px;
    height: 25px;

  }
  
`