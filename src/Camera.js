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

  const capture = ()=>{
      const imgSrc = webcam.current.getScreenshot();
      console.log(imgSrc)
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
        // (전면)user / (후면)environment
        videoConstraints={{facingMode:{ exact: "environment" }}}
      />
      <button onClick={capture}> Capture photo </button>
      
      <img src={webcamImg} width="300" />
      
   
    </div>
  );
}

export default Camera;