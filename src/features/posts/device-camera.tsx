import React, { useRef, useState, useEffect } from 'react';

const DeviceCamera: React.FC<{ onCapture: (image: string) => void }> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Function to start the camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true); // Mark the camera as active
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
      alert("Unable to access the camera. Please check your device permissions.");
    }
  };

  // Stop the camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      setIsCameraActive(false); // Mark the camera as inactive
    }
  };

  // Capture an image from the video feed
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        // Set the canvas size to match the video size
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);

        // Convert the canvas content to a data URL
        const imageData = canvasRef.current.toDataURL('image/jpeg');
        onCapture(imageData); // Pass the captured image data
        stopCamera(); // Optionally stop the camera after capturing
      }
    }
  };

  // Automatically start the camera when the component is rendered
  useEffect(() => {
    startCamera(); // Start the camera when the component is mounted

    return () => stopCamera(); // Clean up camera access when the component is unmounted
  }, []);

  return (
    <div>
      <h3>Device Camera</h3>
      {isCameraActive && (
        <>
          <video ref={videoRef} autoPlay style={{ maxWidth: '100%' }} />
          <button onClick={captureImage}>Capture Image</button>
          <button onClick={stopCamera}>Stop Camera</button>
        </>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default DeviceCamera;
