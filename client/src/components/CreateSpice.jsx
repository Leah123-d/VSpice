import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Camera, SquareX } from "lucide-react";

function CreateSpice({
  createNewSpice,
  isLoading,
  getSpices,
  isAnalyzing,
  setIsLoading,
  setIsAnalyzing,
  newSpiceId,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const allowedImageFormats = [
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/webp",
  ];
  const [spiceImage, setSpiceImage] = useState(null);
  const [imageFormatError, setImageFormatError] = useState(false);
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [capturePhoto, setCapturePhoto] = useState(false);
  const streamRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    console.log("file in file upload", file.size, file.type);
    if (file.size > 5000000) {
      alert("File size exceeds 5MB");
      return;
    }
    if (!allowedImageFormats.includes(file.type)) {
      setImageFormatError(true);
      return;
    } else {
      setImageFormatError(false);
    }
    setSpiceImage(file);
    createNewSpice(file);
    e.target.value = null;
  };

  const getVideo = () => {
    if (!videoRef.current?.srcObject) {
      navigator.mediaDevices
        .getUserMedia({ video: { width: 1920, height: 1080 } })
        .then((stream) => {
          let video = videoRef.current;
          streamRef.current = stream;
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
    captureImageBlob(photo);
    closePhoto();
    stopVideo();
  };

  const captureImageBlob = (photo) => {
    photo.toBlob((blob) => {
      if (blob) {
        console.log("captured blob: ", blob);
        const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
        setSpiceImage(file);
        createNewSpice(file);
      } else {
        console.error("failed to capture image");
      }
    }, "image/jpeg");
  };

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
    setCapturePhoto(false);
    stopVideo();
  };

  const stopVideo = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      console.log("camera has stopped");
    }
  };

  useEffect(() => {
    if (capturePhoto) {
      getVideo();
    }
    return () => {
      stopVideo();
    };
  }, [capturePhoto]);

  useEffect(() => {
    setIsLoading(true);
    setIsAnalyzing(false);
  }, [location.pathname, setIsLoading, setIsAnalyzing]);

  return (
    <div className="upload-container">
      <h1>AI Spice Analyze</h1>
      {/*mobile camera input*/}
      <button onClick={() => setCapturePhoto(true)}>
        Take a photo with your device
      </button>
      {capturePhoto && (
        <div className="camera">
          <div className="flex justify-center items-center w-full h-full">
            <video
              ref={videoRef}
              className="w-[192px] h-[480px] object-cover rounded-lg shadow"
            ></video>
          </div>
          <button onClick={takePhoto}><Camera /></button>
          <div className={"result " + (hasPhoto ? "hasPhoto" : "")}>
            <canvas ref={photoRef} className="hidden"></canvas>
            <button onClick={closePhoto}><SquareX /></button>
          </div>
        </div>
      )}
      {/*upload input*/}
      <section
        id="analyze-section"
        className="flex justify-center items-center h-screen bg-gray-50"
      >
        {imageFormatError && (
          <div
            class="mt-2 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
            role="alert"
            tabindex="-1"
            aria-labelledby="hs-soft-color-danger-label"
          >
            <span id="hs-soft-color-danger-label" class="font-bold">
              Unsupported image. Please make sure your image has of one the
              following formats: ['png', 'jpeg', 'gif', 'webp'].
            </span>
          </div>
        )}
        <div className="image-container">
          {spiceImage && (
            <img
              src={URL.createObjectURL(spiceImage)}
              className="w-[192px] h-[480px] object-cover mx-auto p-2 rounded-xl"
              alt="captured spice"
            />
          )}
        </div>
        <p className="extra-info">
          <span>
            <label htmlFor="files" className="hidden">photo-upload</label>
            <input
              onChange={handleUpload}
              type="file"
              id="files"
              name="file"
              accept="image/*"
              aria-label="photo-input"
            ></input>
          </span>
        </p>

        {isAnalyzing && isLoading && (
          <div className="flex flex-col items-center gap-2 py-4">
            <div className="h-6 w-6 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-600">Analyzing spice...</span>
          </div>
        )}

        {!isAnalyzing && !isLoading && (
          <button
            onClick={async () => {
              await getSpices(newSpiceId);
              navigate(`/view`);
            }}
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-hidden focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20"
          >
            view analyzed spice
          </button>
        )}
      </section>
    </div>
  );
}

export default CreateSpice;
