import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

import './timer.css'

const Timer = (props) => {

  const {minutes, seconds} = props

  const [ timeLeft, setTimeLeft ] = useState(Number(minutes) * 60 + Number(seconds))
  const [ isCounting, setIsCounting ] = useState(false)
  const min = getPadTime(Math.floor(timeLeft / 60))
  const sec = getPadTime(timeLeft - min * 60)

  useEffect(() => {
    const interval = setInterval(() => {
      isCounting &&
        setTimeLeft((timeLeft) => timeLeft >= 1 ? timeLeft - 1 : 0)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [isCounting])
  
  function getPadTime(time) {
    return time.toString().padStart(2, '0')
  }

  return (
    <span className="description">
      <button className="time-icon icon-play" onClick={() => setIsCounting(true)}></button>
      <button className="time-icon icon-pause" onClick={() => setIsCounting(false)}></button>

      <span className='minutes'>{min}</span>
      <span className='seconds'>:</span>
      <span className='seconds'>{sec}</span>
    </span>
  )
}

Timer.propTypes = {
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired, 
}

export default Timer