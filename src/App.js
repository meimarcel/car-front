import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ImgContainer, ResultContainer } from './styles';
import api,{PREDICT} from './api.js';

function App() {

  const [imgUpload, setImgUpload] = useState("")
  const [imgSend, setImg] = useState("")
  const [showResult, setShowResult] = useState(false)
  async function send(){
    let formData = new FormData()
    if(imgSend !== ""){
      formData.append("imageFile", imgSend)
      formData.append("image", imgSend.name)
      await api.post(PREDICT, formData, { headers: { 'Content-Type': 'multipart/form-data'} })
        .then(
          function(){

          }
        )
    }
  
  }
  const handleChange = e => {
    setImgUpload(e.target.files[0])
    setImg(URL.createObjectURL(e.target.files[0]))
  }
  return (
    <div className="container">
      <div className="custom-file">
        <input type="file" className="custom-file-input" id="validatedCustomFile" required onChange={handleChange} />
        <label className="custom-file-label" htmlFor="validatedCustomFile">Escolha o arquivo...</label>
        <div className="invalid-feedback">Example invalid custom file feedback</div>
      </div>
      <ResultContainer>
        {imgSend!=="" && 
          <>
            <ImgContainer src={imgSend} />
            {showResult ?
              <ImgContainer src={imgSend} /> : 
              <ImgContainer>
                <button onClick={() => setShowResult(true)}>
                  Enviar
                </button>
              </ImgContainer>
            }
          </>
        }
        
      </ResultContainer>

    </div>
  );
}
export default App;
