import React from 'react';
import styled from "@emotion/styled";
import {Button, makeStyles} from "@material-ui/core";
import {auth, provider} from "../../firebase";


const useStyles = makeStyles({
    img: {
        height: "450px",
        width: "450px",
        borderRadius: "50%"
    },
    btn: {
        backgroundColor: "#D7D8D9",
        fontWeight: 600,
        width: "300px"
    },

});

const Login = () => {
    const classes = useStyles()
    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) =>
            alert(error.message))
    }

    return (
        <Wrapper>
            {/*<h1>Я верю в тебя 🚀</h1>*/}
            <Logo>
                <img className={classes.img} src="/images/login2.png" alt="logo"/>
            </Logo>
            <Typewriter>
                <h1>Non-constructive Messenger </h1>
            </Typewriter>
            <Button
                onClick={signIn}
                className={classes.btn}>Войдите</Button>
        </Wrapper>
    );
}

export default Login;

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  margin-top: 15vh;
  //height: 90vh;
  //width: 100vh;

  h1 {
    line-height: 60%;
    font-size: 40px;
    margin-bottom: 50px;
  }
`
const Logo = styled.div`
  margin-bottom: 50px;
`

const Typewriter = styled.div`
  font-family: monospace;
  overflow: hidden;
  border-right: .1em solid black;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: .17em;
  animation: typing 2.5s steps(30, end),
  blink-caret .6s step-end infinite;
}

@keyframes typing {
  from {
    width: 0
  }
  to {
    width: 35%
  }
}

@keyframes blink-caret {
  from, to {
    border-color: transparent
  }
  50% {
    border-color: #D7D8D9
  }

`
