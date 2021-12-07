import React, {forwardRef} from 'react';
import {Avatar} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectUser} from "../../../features/loginSlice";
import "../../../styles/FormMessage.css"
import useSound from 'use-sound';
import boopSfx from '../../sounds/sentmessage.mp3';


const FormMessage = forwardRef(({
        id, contents: {
        timestamp,
        displayName,
        email,
        message,
        photo,
        uid
    }}, ref) => {

    const user = useSelector(selectUser)
    const [play] = useSound(boopSfx);
    return (
        <div ref={ref}
             className={`message ${user.email === email && 
        "another_user"}`}>
            <Avatar className="message_photo" src={photo}/>
            <p >{play}{message}</p>
            {/*Играем с временем*/}
            <small>{new Date(timestamp?.toDate()).toLocaleTimeString()}
            </small>
        </div>
    );
})

export default FormMessage;
