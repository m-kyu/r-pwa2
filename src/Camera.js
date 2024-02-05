import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';


function Camera(props) {
  const [preImage, setPreImage] = useState();
  const file = (e)=>{
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload=(e)=>{
        setPreImage(e.target.result)
      }
  }

  const webcam = useRef(null);
  const [webcamImg, setWebcamImg] = useState(null);

  const capture = async ()=>{
      const imgSrc = webcam.current.getScreenshot();

      const blob = new Blob([imgSrc], { type: 'image/jpeg' });
      const formData = new FormData();
      formData.append('image', blob);
      
      //await fetch('http://localhost:3000/camera/save',{
      await fetch('https://port-0-express-jvvy2blm4a51lv.sel5.cloudtype.app/camera/save',{
        method:'post',
       /*  headers: {
          'Content-type': 'application/json'
        }, */
        body:formData
      })    
      setWebcamImg(imgSrc);
  }

  return (
    <div>
      {/* <form method='post' encType='multipart/form-data'></form> */}
      <img src={preImage} />
      <input type="file" name="photo" onChange={file} multiple />


      <Webcam
        ref={webcam}
        audio={false}
        screenshotFormat="image/jpeg"
        width="100%"
        height="auto"
        
        videoConstraints={{facingMode:"user"}}  /* 전면 */
        // videoConstraints={{facingMode:{ exact: "environment" }}} 후면
      />
      <button onClick={capture}> Capture photo </button>
      
      <img src={webcamImg} width="300" />
      
   
    </div>
  );
}

export default Camera;