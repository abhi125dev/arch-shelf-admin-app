import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const CircleProgressBar = ({ percent }) => {
	const progressCount = percent * 1.85

	return (
		<div className="circle-progress-bar">
			<span className="progress-count">
				<span className="count">{percent}%</span>
				<span className="text">complete</span>
			</span>
			<svg className="loader-svg" viewBox="0 0 130 130">
				<circle className="loader" cx="65" cy="65" r="55" />
				<circle
					className="loader main"
					cx="65"
					cy="65"
					r="55"
					style={{ strokeDasharray: `${progressCount}, 350` }}
				/>
				<circle className="dash" cx="65" cy="65" r="55" />
			</svg>
		</div>
	)
}

CircleProgressBar.propTypes = {
	percent: PropTypes.number,
}

CircleProgressBar.defaultProps = {
	percent: 0,
}

export { CircleProgressBar }
