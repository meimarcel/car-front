import styled from 'styled-components';

export const ImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    width: 45%;
    background: url(${props => props.src});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`
export const ResultContainer = styled.div`
    min-height: 70vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 1100px;
    background-color:grey;
`