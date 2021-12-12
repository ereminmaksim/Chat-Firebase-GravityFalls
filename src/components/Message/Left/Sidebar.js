import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import {Avatar, IconButton, makeStyles} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewIcon from '@mui/icons-material/RateReview';
import SidebarChat from "./SidebarChats/SidebarChats";
import {selectUser} from "../../../features/loginSlice";
import {useSelector} from "react-redux";
import db, {auth} from "../../../firebase";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";


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
    },
    iconButton: {
        color: "white"
    }
});


const Sidebar = () => {
    const classes = useStyles()
    const user = useSelector(selectUser)
    const [chats, setChats] = useState([])
    const [searchValue, setSearchValue] = useState('')


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

    const searchInput = (event) => {
        setSearchValue(event.target.value)
        console.log(chats)
    }

    const filterItems =
        chats.filter(obj => obj.data.chatName.toLowerCase().includes(searchValue.toLowerCase()))


//**********************************************************************//
    const [characters, updateCharacters] = useState(filterItems);
    function handleDnD (result) {
        console.log(result)
        if (!result.destination) return;

        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateCharacters(items);
    }
    //**********************************************************************//
    return (
        <Wrapper>
            <SidebarHeader>
                <Avatar
                    onClick={signOut}
                    src={user.photo}
                    className={classes.avatar}/>
                <SidebarInput>
                    <SearchIcon
                        className={classes.search}
                        onClick={() => {
                            setSearchValue('')
                        }}
                    />
                    <input onChange={searchInput}
                           value={searchValue}
                           placeholder="Поиск"
                           className={classes.input}/>
                </SidebarInput>

                <IconButton className={classes.iconButton}
                    onClick={addChat}
                    variant="outlined">
                    <RateReviewIcon/>
                </IconButton>
            </SidebarHeader>
            <SidebarChats>
                <DragDropContext onDragEnd={handleDnD}>
                    <Droppable droppableId={classes.root}>
                        {(provided) => (
                            <ul className={classes.root} {...provided.droppableProps} ref={provided.innerRef}>
                                {filterItems.map(({id, data: {chatName}}, index) => (
                                    <Draggable key={id} draggableId={id} index={index}>
                                        {(provided) => (
                                            <li
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                                // style={getStyleElements(snapshot.isDragging,
                                                //     provided.draggableProps.style
                                                // )}
                                            >
                                                <SidebarChat key={id}
                                                             id={id}
                                                             chatName={chatName}/>
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
                {/*))}*/}
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
  //border-right: 1px solid #040307;
  background-image: url("/images/sidebar.png");
`

const SidebarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
  height: 62px;
  border-bottom: 1px solid #040307;
  /********************************/
  border-radius: 2px;
  background-color: #9308a8;
  box-shadow:
          inset rgba(0,0,0,.5) 0, 0, 12px,
          inset rgba(255,255,255,.9) 1px 1px 12px,
          rgba(0,0,0,.8) 3px 3px 8px -3px;

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
  
  li{
    list-style-type: none;
  }
  

  &::-webkit-scrollbar {
    -ms-overflow-style: none;
    display: none;
  }
`