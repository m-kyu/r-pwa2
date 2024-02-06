import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';


function Camera(props) {

  const [preImage, setPreImage] = useState();
  const [test, setTest] = useState();
  const [data, setData] = useState([]);
  const basicUrl = 'https://port-0-express-jvvy2blm4a51lv.sel5.cloudtype.app';

  const file = (e) => {
    // 미리보기
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = (e) => {
      setPreImage(e.target.result);
    }
    
    let t = new Date(e.target.files[0].lastModified)
    t.setSeconds(t.getSeconds() + 10)

    setTest(e.target.files[0])



    //서버에 이미지 저장
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    fetch(basicUrl+'/camera/save',{
      method:'post',
      body:formData
    })
    .then(res=>res.json())
    .then(res=>{
      setData([...data,res.fileUrl])
    })
  }

  const webcam = useRef(null);
  const [webcamImg, setWebcamImg] = useState(null);

  const capture = async () => {
    const imgSrc = webcam.current.getScreenshot();

    const blob = new Blob([imgSrc], { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('image', blob);


    //await fetch('http://localhost:3000/camera/save',{
    await fetch('https://port-0-express-jvvy2blm4a51lv.sel5.cloudtype.app/camera/save', {
      method: 'post',
      /*  headers: {
         'Content-type': 'application/json'
       }, */
      body: formData
    })
    setWebcamImg(imgSrc);
  }

  return (
    <div>
      {/* <form method='post' encType='multipart/form-data'></form> */}
      <img src={preImage} width="200" />
      <input type="file" name="photo" onChange={file} multiple />

      <ul>
        {
          data.map((obj,k)=>(
            <li key={k}>
              <img src={obj}/>
              <button onClick={()=>{
                fetch(`${basicUrl}/camera/photo/${obj}`,{
                  method:'delete',
                })
                .then(res=>res.text())
                .then(res=>{
                  console.log('삭제성공')
                })
              }}>삭제</button>
            </li>
          ))
        }
      </ul>
      <div>
        
      
        {test?.name} <br />
        {test?.size}
        {test?.type}
        {test?.webkitRelativePath}
        {/* {test?.lastModified} */}
        {test?.lastModified}
      </div>

      {/* <input type="file" accept="image/*" capture="camera" /> */}


      <Webcam
        ref={webcam}
        audio={false}
        screenshotFormat="image/jpeg"
        width="300"
        height="300"

        videoConstraints={{ facingMode: "user" }}  /* 전면 */
      // videoConstraints={{facingMode:{ exact: "environment" }}} 후면
      />
      <button onClick={capture}> Capture photo </button>

      <img src={webcamImg} width="300" />


    </div>
  );
}

export default Camera;