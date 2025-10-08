
import React from 'react'

export default function Model({ selimage,closeModel,showNext,showPrev}) {
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      closeModel();
    }
  };
  return (
    <div className="backdrop" onClick={handleBackdropClick}>
      <button className = "nav-button prev" onClick={showPrev}>&lt;</button>
      <div className="modal-content">
        <img src={selimage.imageURL} alt={selimage.title}/>
        <div className='modal-info'>
          <h3>{selimage.title}</h3>
          <p><strong>Type:</strong> {selimage.category} | <strong>Score:</strong> {selimage.rating} </p>
          <p>{selimage.description}</p>
        </div>
      </div>
      <button className = "nav-button next" onClick={showNext}>&gt;</button>
    </div>
  )
}
