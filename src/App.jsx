import { useState } from "react";
import "./App.css";
import { useRef } from "react";
import PhotoIcon from "./components/PhotoIcon";
import { nanoid } from "nanoid";

function App() {
  const [images, setImages] = useState([
    {
      id: nanoid(4),
      src: "/image-7.webp",
    },
    {
      id: nanoid(4),
      src: "/image-2.webp",
    },
    {
      id: nanoid(4),
      src: "/image-3.webp",
    },
    {
      id: nanoid(4),
      src: "/image-4.webp",
    },
    {
      id: nanoid(4),
      src: "/image-5.webp",
    },
    {
      id: nanoid(4),
      src: "/image-6.webp",
    },
    {
      id: nanoid(4),
      src: "/image-1.webp",
    },
    {
      id: nanoid(4),
      src: "/image-8.webp",
    },
    {
      id: nanoid(4),
      src: "/image-9.webp",
    },
    {
      id: nanoid(4),
      src: "/image-10.jpeg",
    },
    {
      id: nanoid(4),
      src: "/image-11.jpeg",
    },
  ]);

  const [selectedImages, setSelectedImages] = useState([]);

  const dragImage = useRef(0);
  const draggedOverImage = useRef(0);

  function handleSort() {
    const imagesClone = [...images];
    const temp = imagesClone[dragImage.current];
    imagesClone[dragImage.current] = imagesClone[draggedOverImage.current];
    imagesClone[draggedOverImage.current] = temp;
    setImages(imagesClone);
  }

  function handleImageSelect(evt) {
    const itemExist = selectedImages.find((image) => image === evt.target.id);
    // let itemExist = false;
    // for (let i = 0; i < selectedImages.length; i++) {
    //   if (selectedImages[i] === evt.target.id) itemExist = true;
    // }

    if (itemExist) {
      const newItems = selectedImages.filter(
        (image) => image !== evt.target.id
      );
      setSelectedImages(newItems);
    } else {
      setSelectedImages([...selectedImages, evt.target.id]);
    }
  }

  function handleDelete() {
    let newItems = images.filter((image) => !selectedImages.includes(image.id));
    setImages(newItems);
    setSelectedImages([]);
  }

  function handleImageUpload(evt) {
    const selectedFile = evt.target.files[0];
    // console.log(selectedFile);
    if (selectedFile) {
      const type = selectedFile.type.split("/")[0];
      if (type === "image") {
        const newImage = URL.createObjectURL(selectedFile);
        setImages([...images, { id: nanoid(4), src: newImage }]);
      }
    }
  }

  return (
    <main className="container">
      <div className="gallery-wrapper-header">
        {selectedImages.length > 0 ? (
          <div className="action">
            <h3>{selectedImages.length} Images Selected!</h3>
            <button onClick={handleDelete} className="delete-button">
              Delete Files
            </button>
          </div>
        ) : (
          <h1 className="title">Gallery</h1>
        )}
      </div>

      <div className="gallery">
        {images.map((image, index) => (
          <div
            className="gallery-image-wrapper"
            key={image.id}
            draggable
            onDragStart={() => (dragImage.current = index)}
            onDragEnter={() => (draggedOverImage.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              className="image-checkbox"
              type="checkbox"
              name="image-checkbox"
              onChange={handleImageSelect}
              id={image.id}
            />
            <img src={image.src} className="gallery-image" />
          </div>
        ))}

        <div className="upload-image-wrapper">
          <label className="upload-image-label" htmlFor="image-upload">
            <PhotoIcon />
            Add Image!
            <input
              type="file"
              id="image-upload"
              name="image-upload"
              className="upload-image"
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>
    </main>
  );
}

export default App;
