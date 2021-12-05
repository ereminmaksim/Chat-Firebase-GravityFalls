import React, {useEffect} from 'react';
import './styles/App.css';
import Message from "./components/Message/Message";
import {selectUser, login, logout} from "./features/loginSlice";
import {useDispatch, useSelector} from "react-redux";
import Login from "./components/Login/Login";
import { auth } from "./firebase";



function App() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()


    useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
        if (userAuth) {
            dispatch(login({
                //получение данных из GOOGLE`
                uid: userAuth.uid,
                photo:userAuth.photoURL,
                email:userAuth.email,
                displayName:userAuth.displayName
            }))
        }else {
            dispatch(logout())
        }
    })

    }, [])

    return (
        <div className="App">
            {user ? (
                <Message/>
            ) :
                // <h2>Попробуй ещё раз, я верю в тебя 🚀</h2>
            <Login />
            }
        </div>
    );
}
export default App;
