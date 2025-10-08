
import React from 'react'

export default function Model({ image,close,showNext,showPrev}) {
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      close();
    }
  };
  return (
    <div className="backdrop" onClick={handleBackdropClick}>
      <button className = "nav-button prev" onClick={showPrev}>&lt;</button>
      <div className="modal-content">
        <img src={image.imageURL} alt={image.title}/>
        <div className='modal-info'>
          <h3>{image.title}</h3>
          <p><strong>Type:</strong> {image.category} | <strong>Score:</strong> {image.rating} </p>
          <p>{image.description}</p>
        </div>
      </div>
    </div>
  )
}
