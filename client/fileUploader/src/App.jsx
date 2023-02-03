import { useState } from 'react'
import './App.css'

function App() {
  const [image, setImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('');
  const [paths,setPaths]=useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', image.data)
    const response = await fetch('http://localhost:8080/upload', {
      method: 'POST',
      body: formData,
    })
    const resdata= await response.json();
    console.log(resdata);
    if (response) setStatus(response.statusText);
    setPaths([...paths,resdata.originalname]);
  }

  const handleDownload= async (item)=>{
    window.open(`http://localhost:8080/download?url=${item}`)
    // alert("download")
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  return (
    <div className="App">
      <h1>Upload to server</h1>
      {image.preview && <img src={image.preview} width='100' height='100' />}
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <input type='file' name='file' onChange={handleFileChange}></input>
        <button type='submit'>Submit</button>
      </form>
      {status && <h4>{status}</h4>}
      {/* <button type='button' onClick={handleDownload}>Download</button> */}
      <div>
        {
          paths.map((item,index)=> ( <div className="FileList" key={index}>
            <span className="FileName">{item}</span> <button type="button" onClick={(e)=>handleDownload(item)}>Download</button>
          </div>)
            )
        }
      </div>
    </div>
    
  )
}

export default App
