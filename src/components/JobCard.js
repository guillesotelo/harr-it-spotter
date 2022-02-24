import React from 'react'

export default function JobCard(props) {
    const { card, setShowModal } = props
  return (
        <div className='card'>
            <h4 className='location'>{card.location.toUpperCase() || ''}</h4>
            <h2 className='job-title'>{card.job || ''}</h2>
            <div className='underline'></div>
            <button className='card-btn' onClick={() => setShowModal(card)}>APPLY</button>
        </div>
  )
}
