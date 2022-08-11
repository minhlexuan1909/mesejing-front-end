import React from 'react'
import './Opening.scss'


function Opening() {
  return (
    <div className='opening-container'>
        <div className='opening-title'>
            <span>Chào mừng đến với <b>Mesejing</b></span>
            <p>Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người thân, bạn bè được tối ưu hoá cho máy tính của bạn.</p>
        </div>
        <div className='opening-content'>
            <img alt='opening' src='https://chat.zalo.me/assets/inapp-welcome-screen-0.19afb7ab96c7506bb92b41134c4e334c.jpg'></img>
        </div>
    </div>
  )
}

export default Opening