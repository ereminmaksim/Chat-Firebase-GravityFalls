import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import {Avatar, IconButton, makeStyles} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewIcon from '@mui/icons-material/RateReview';
import SidebarChat from "./SidebarChats/SidebarChats";
import {selectUser} from "../../../features/loginSlice";
import {useSelector} from "react-redux";
import db, {auth} from "../../../firebase";


const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 500,
    },
    avatar: {
        cursor: "pointer",
        margin: '10px'
    },

    input: {
        border: "none",
        background: "transparent",
        outlineWidth: 0,
        color: "white",

    },
    search: {
        cursor: "pointer",
    }
});


const Sidebar = () => {
    const classes = useStyles()
    const user = useSelector(selectUser)
    const [chats, setChats] = useState([])

    useEffect(() => {
        db.collection("chats").onSnapshot((snapshot) =>
            setChats(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()

                }))
            )
        )
    }, []);

    //выход по фото!!!
    const signOut = () => {
        auth.signOut().then(result => console.log(result, "🔥🔥🔥🔥"))
    }

    const addChat = () => {
        const chatName = prompt("Введи название нового чата")
        if (chatName) {
            db.collection("chats").add({
                chatName: chatName,
            })
            // .then(result => console.log(result, "🔥🔥🔥🔥")
        }
    }


    return (
        <Wrapper>
            <SidebarHeader>
                <Avatar
                    onClick={signOut}
                    src={user.photo}
                    className={classes.avatar}/>
                <SidebarInput>
                    <SearchIcon
                        className={classes.search}/>
                    <input placeholder="Поиск" className={classes.input}/>
                </SidebarInput>

                <IconButton
                    onClick={addChat}
                    variant="outlined">
                    <RateReviewIcon/>
                </IconButton>
            </SidebarHeader>
            <SidebarChats>
                {chats.map(({id, data: {chatName}}) => (
                    <SidebarChat key={id}
                                 id={id}
                                 chatName={chatName}
                    />
                ))}
            </SidebarChats>
        </Wrapper>
    )
}
export default Sidebar


const Wrapper = styled.div`

  order: 0;
  flex: 0.20;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #D7D8D9;
  border-right: 1px solid #040307;
  background-image: url("/images/sidebar.png");
`

const SidebarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
  height: 62px;
  background-color: #D7D8D9;
  border-bottom: 1px solid #040307;

`
const SidebarInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: #3F3D43;
  color: white;
  border-radius: 5px;


`
const SidebarChats = styled.div`
  background-color: #D7D8D9;
  //  ВАЖНО ДЛЯ ПРОКРУТКИ:
  //-УБИРАЕМ БОКОВОЙ СКРОЛЛ
  overflow: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    -ms-overflow-style: none;
    display: none;
  }
`
