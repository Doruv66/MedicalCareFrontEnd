import React from 'react';
import ImageUploading from 'react-images-uploading';
import style from './ImageUpload.module.css'
export function ImageUpload(props) {
  const [images, setImages] = React.useState([]);
  const maxNumber = 1;

  const onChange = (imageList) => {
    // data for submit
    setImages(imageList);
    props.updateDoctor("photo", imageList);
    console.log(props.doctor);
  };

  return (
    <div className={style.wrapper}>
      <h1>Image Upload</h1>
      <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="400" height="530"/>
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>UPDATE</button>
                  <button onClick={() => onImageRemove(index)}>REMOVE</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
    </div>
  );
}