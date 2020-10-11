import styled from 'styled-components';

export const ImgContainer = styled.div`
    height: 400px;
    margin: auto;
    width: 45%;
    img {
        width: 100%;
        height: 100%;
    }
`
export const ResultContainer = styled.div`
    min-height: 65vh;
    margin-top: 30px;
    padding-top: 30px;
    width: 100%;
    box-shadow: grey 1px 1px 10px;
    
    .buttons {
        margin-top: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .qtd-div {
        margin-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    button {
        border-radius: 5px;
    }
`
export const Container = styled.div`
    .titulo {
        margin: 50px 0;
        font-family: 'Ubuntu';
        text-align: center;
    }
    .sleep-container {
        width:50%;
        margin: auto;
        border: solid 1px black;
        border-radius: 2px;
    }

`
export const FadeContainer = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0px;
    left: 0px;
    width: 100vw;
    height:100vh;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 10000;
`
