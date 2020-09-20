import React, { useEffect, useState } from "react";
import ReactMicRecord from "react-mic-record";

const RecordButton = (props) => {
  const [record, setRecordStatus] = useState(false);

  const startRecording = () => {
    setRecordStatus(true);
  };
  const stopRecording = () => {
    setRecordStatus(false);
  };

  // const smth = ()=>{
  //     onData(recordedBlob) {
  //         console.log('chunk of real-time data is: ', recordedBlob);
  //       }
  // }

  // const smth1 = ()=>{
  //     onStop(recordedBlob) {
  //         console.log('recordedBlob is: ', recordedBlob);
  //       }
  // }

  return (
    <div>
      <ReactMicRecord
        record={record}
        className="sound-wave"
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
      <button onTouchTap={startRecording} type="button">
        Start
      </button>
      <button onTouchTap={stopRecording} type="button">
        Stop
      </button>
    </div>
  );
};

export default RecordButton;
