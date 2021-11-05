import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Image, Loader } from 'semantic-ui-react'
import classNames from 'classnames'

import './style.scss'

const photoSize = {
	small: {
		width: 120,
		height: 120,
	},
	tiny: {
		width: 80,
		height: 80,
	},
	mini: {
		width: 35,
		height: 35,
	},
	extraMini: {
		width: 25,
		height: 25,
	},
}

const UserPhoto = ({ className, size, user, src, square }) => {
	const [loaded, setLoaded] = useState(false)

	if (!src) {
		src = user.photo ? user.photo : null
	}

	return (
		<React.Fragment>
			{src && (
				<div
					className={classNames(`user-photo-wrap ${className} ${size}`, { square })}
					style={{
						width: `${photoSize[size].width}px`,
						height: `${photoSize[size].height}px`,
						lineHeight: `${photoSize[size].height}px`,
					}}
				>
					{!loaded && <Loader active inline="centered" size={size} />}
					<Image
						className={classNames(className, size, { square })}
						src={src}
						avatar
						size={size}
						style={{
							width: `${photoSize[size].width}px`,
							height: `${photoSize[size].height}px`,
						}}
						onLoad={() => setLoaded(true)}
					/>
				</div>
			)}
			{!src && (
				<div
					className={classNames(`user-initials-wrap ${className} ${size}`, { square })}
					style={{
						width: `${photoSize[size].width}px`,
						height: `${photoSize[size].height}px`,
						lineHeight: `${photoSize[size].height}px`,
					}}
				>
					<span className="user-initials" style={{ fontSize: `${photoSize[size].height / 30}rem` }}>
						{`${user.first_name.slice(0, 1)}${user.last_name.slice(0, 1)}`}
					</span>
				</div>
			)}
		</React.Fragment>
	)
}

UserPhoto.propTypes = {
	className: PropTypes.string,
	size: PropTypes.string,
	user: PropTypes.object.isRequired,
	src: PropTypes.string,
	square: PropTypes.bool,
}

UserPhoto.defaultProps = {
	className: '',
	size: 'mini',
	src: null,
	square: false,
}

export { UserPhoto }
