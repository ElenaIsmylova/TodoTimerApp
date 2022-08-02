import PropTypes from 'prop-types'
import { Component } from 'react'

import './timer.css'

export default class Timer extends Component {

  state = {
    timeLeft: Number(this.props.minutes) * 60 + Number(this.props.seconds),
    m: this.props.minutes,
    s: this.props.seconds
  }

  getPadTime = (time) => {
    return time.toString().padStart(2, '0')
  }

  handlePlay = () => {
    this.clearInt()
    if (this.state.timeLeft > 0) {
      this.interval = setInterval(() => {
        let timeLeft = this.state.timeLeft - 1
        if (timeLeft === 0) this.clearInt()
        this.setState({
          timeLeft: timeLeft,
          m: Math.floor(timeLeft / 60),
          s: timeLeft % 60
        })
      }, 1000)
    }
  }

  handlePause = () => {
    this.clearInt()
  }

  clearInt = () => {
    clearInterval(this.interval)
  }

  render() {
    const {m, s} = this.state
    const min = this.getPadTime(m)
    const sec = this.getPadTime(s)
    return (
      <span className="description">
        <button className="time-icon icon-play" onClick={this.handlePlay}></button>
        <button className="time-icon icon-pause" onClick={this.handlePause}></button>

        <span className='minutes'>{min}</span>
        <span className='seconds'>:</span>
        <span className='seconds'>{sec}</span>

      </span>
    )
  }
}

Timer.propTypes = {
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired, 
}