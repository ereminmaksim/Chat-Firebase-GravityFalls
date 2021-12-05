import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import {IconButton, makeStyles, TextField} from "@material-ui/core";
import CreateSharpIcon from '@material-ui/icons/CreateSharp';
import FormMessage from "./FormMessage";
import {useSelector} from "react-redux";
import {selectChatId, selectChatName} from "../../../features/chatSlice";
import db from "../../../firebase";
//УСТАНОВИТЬ ВРЕМЯ ОТПРАВКИ ИЗ FIREBASE!!!
import firebase from "firebase"
import {selectUser} from "../../../features/loginSlice";
//Анимация
import FlipMove from "react-flip-move";
//Текущее время


const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 500,
    },
    input: {
        border: "1 solid black",
        outlineWidth: 0,
        width: "98%",
        borderColor: "black"

    }
});

const Chat = () => {

    const classes = useStyles()
    const [value, setValue] = useState('');
    const user = useSelector(selectUser)
    const chatName = useSelector(selectChatName)
    const chatId = useSelector(selectChatId)
    const [messages, setMessages] = useState([])
    const [today, setDate] = React.useState(new Date())

    useEffect(() => {
        if (chatId) {
            db.collection("chats")
                .doc(chatId)
                .collection("messages")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) =>
                    setMessages(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            data: doc.data()
                        }))
                    )
                )
        }
    }, [chatId])

//*******************************************//
    const locale = 'en';
    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 60 * 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);
    const time = today.toLocaleTimeString(locale, {hour: 'numeric', hour12: true, minute: 'numeric'});
    //*******************************************//


    //*******************************************//
    const handleChange = (e) => {
        setValue(e.target.value)
    }
    /*********************************/
    const handleSubmit = () => {
    }
    /*********************************/
    const sendMessage = (e) => {
        e.preventDefault()

        db.collection("chats")
            .doc(chatId).collection("messages")
            .add({
                //ВРЕМЯ ОТПРАВКИ!!!(НЕ ЗАВИСИТ ОТ РЕГИОНА)
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: value,
                uid: user.uid,
                photo: user.photo,
                email: user.email,
                displayName: user.displayName
            })


        // setValue('')
    }

    return (

        <Wrapper>
            <ChatHeader>
                <h4>Название чата:
                    <Сhannel>{chatName}</Сhannel>
                </h4>
                <span>Время: {time}</span>
            </ChatHeader>


            <ChatMessage>
                <Background/>
                <FlipMove>
                    {
                        messages.map(({id, data}) => (
                            <FormMessage
                                key={id}
                                contents={data}
                            />
                        ))}
                </FlipMove>
            </ChatMessage>


            <ChatInput>
                <form onSubmit={handleSubmit}>
                    <TextField
                        className={classes.input}
                        id="standard-basic"
                        label="Текст"
                        onChange={handleChange}
                        value={value}/>
                    <button onClick={sendMessage}>Отправить</button>
                </form>
                <IconButton>
                    <CreateSharpIcon/>
                </IconButton>
            </ChatInput>
        </Wrapper>

    )
}

export default Chat


const Wrapper = styled.div`
  background-image: url("/images/chat4.png");
  background-attachment: fixed;
  opacity: .9;
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 0.80;
  height: 100vh;
  background-color: white;


`
const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  border-bottom: 1px solid #040307;
  background-color: #D7D8D9;
  


  h4 {
    color: grey;
    font-weight: 500;

  }

`
const Сhannel = styled.span`
  color: black;
`
const ChatMessage = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
  overflow: scroll;
  

  h3 {
    padding: 20px;
  }

  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

`
const Background = styled.div`
  //background-image: url("/images/chat4.png");
  //position: absolute;
  //z-index: -1;
  //width: 100%;
  //height: 100%;
  //opacity: .8;
  //background-attachment: fixed;
  //background-size: cover;
  //inset: 0;
  //display: block;
  //top: 0;
  //object-fit: cover;
  
`


const ChatInput = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid #040307;
  background-color: #D7D8D9;

  form {
    flex: 1;

    button {
      display: none;
    }
  }

`
