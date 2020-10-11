import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ImgContainer, ResultContainer, Container, FadeContainer } from './styles';
import api,{PREDICT} from './api.js';
import Spinner from 'react-spinkit'

function App() {

  const [imgUpload, setImgUpload] = useState("")
  const [imgSend, setImg] = useState("")
  const [imgResultAll, setImgResultAll] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [spinerIsOn, setSpinerIsOn] = useState(false)
  const [sleepTimer, setSleepTimer] = useState(50)
  const [loop, setLoop] = useState("")
  var index = 0

  useEffect(() => {
    if(showResult) {
      clearInterval(loop)
      setLoop(setInterval(runGif, sleepTimer))
    }
  }, [showResult]);

  async function send() {
    setSpinerIsOn(true)
    let formData = new FormData()
    if(imgSend !== "") {
      formData.append("imageFile", imgUpload)
      formData.append("image", imgUpload.name)
      await api.post(PREDICT, formData)
        .then((response) => {
            setImgResultAll(response.data)
            setShowResult(true)
            setSpinerIsOn(false)
        }) 
        .catch((error) => {
          setImg("")
          setShowResult(true)
          setSpinerIsOn(false)
        })
    }
  }

  function runGif() {
    if(imgResultAll.length !== 0) {
      document.getElementById("result-image").src = "data:image/jpeg;base64," + imgResultAll.imageFile[index]
      document.getElementById("qtd").innerHTML = "Quantidade: " + imgResultAll.quantidade[index++]
      index = index % imgResultAll.imageFile.length
    }
  }

  function deleteImage() {
    setImgUpload("")
    setImg("")
    document.getElementById("validatedCustomFile").value = "";
  }

  const handleChange = e => {
    if(e.target.files[0]) {
      setImgUpload(e.target.files[0])
      setImg(URL.createObjectURL(e.target.files[0]))
    }
  }

  function newRequest() {
    window.location.reload();
  }

  function timeChange(type) {
    if(type === "plus" && sleepTimer < 1000) {
      setSleepTimer(sleepTimer + 50);
      clearInterval(loop)
      setLoop(setInterval(runGif, sleepTimer + 50))
      console.log(sleepTimer)
    } 
    if(type === "minus" && sleepTimer > 50) {
      setSleepTimer(sleepTimer - 50);
      clearInterval(loop)
      setLoop(setInterval(runGif, sleepTimer - 50))
      console.log(sleepTimer)
    }
  }
  return (
    <>
    {spinerIsOn &&
      <FadeContainer>
        <span>
          <Spinner
            name='three-bounce'
            color="#403C33"
          />
        </span>
      </FadeContainer>
    }
    <Container>
    { showResult ? 
      <>
      <div className="container">
        <div className="titulo">
          <h1>Car Detection</h1>
        </div>
        <div className="sleep-container">
          <div className="input-group">
            <button type="button" className="btn btn-default btn-number" onClick={() => {timeChange("minus")}}>
                <span>-</span>
            </button>
            <input type="text" name="quant" className="form-control input-number" value={sleepTimer} readOnly/>
            <button type="button" className="btn btn-default btn-number" onClick={() =>{timeChange("plus")}} >
                <span>+</span>
            </button>
          </div>
        </div>
        <ResultContainer>
          <ImgContainer>
            <img id="result-image" src="" alt=""/>
          </ImgContainer>
          <div className="qtd-div">
            <label id="qtd">Quantidade: </label>
          </div>
          <div className="buttons">
              <button type="button" className="btn btn-success" onClick={() => newRequest()}>
                Fazer Nova Requisição
              </button>
          </div>
        </ResultContainer>
      </div>
      </>
    : <div className="container">
        <div className="titulo">
          <h1>Car Detection</h1>
        </div>
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="validatedCustomFile" required onChange={handleChange} />
          <label className="custom-file-label" htmlFor="validatedCustomFile">{ imgUpload === "" ? "Escolha o arquivo..." : imgUpload.name}</label>
          <div className="invalid-feedback">Example invalid custom file feedback</div>
        </div>
        <ResultContainer>
          {imgSend!=="" && 
            <>
              <ImgContainer>
                <img src={imgSend} alt="Imagem a enviar"/>
              </ImgContainer>
              <div className="buttons">
                <button type="button" className="btn btn-success" onClick={() => send()}>
                  Enviar
                </button>
                &nbsp;
                <button type="button" className="btn btn-danger" onClick={() => deleteImage()}>
                  Excluir
                </button>
              </div>
            </>
        }
        
      </ResultContainer>

    </div>}
    </Container>
    </>
  );
}
export default App;
