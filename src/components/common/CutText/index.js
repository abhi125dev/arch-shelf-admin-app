import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const CutText = ({ text, children, rows, moreLabel }) => {
	const elRef = useRef()
	const [cutIndex, setCutIndex] = useState(null)
	const [mounted, setMounted] = useState(false)
	const [learnedMore, setLearnedMore] = useState(false)

	if (children) {
		text = children
	}

	const learnMoreClickHandler = () => {
		setCutIndex(null)
		setLearnedMore(true)
	}

	useEffect(() => {
		if (!elRef.current) {
			return false
		}

		const index = _.findIndex(elRef.current.children, child => child.offsetTop > child.offsetHeight * rows)

		if (index !== -1) {
			setCutIndex(index - moreLabel.length)
		}

		setMounted(true)
	}, [])

	return (
		<React.Fragment>
			<div ref={elRef} style={{ position: 'relative' }}>
				{cutIndex ? (
					<React.Fragment>
						{text.substr(0, cutIndex) + '... '}
						{!learnedMore && (
							// eslint-disable-next-line
							<span
								style={{ textDecoration: 'underline', cursor: 'pointer' }}
								onClick={learnMoreClickHandler}
							>
								{moreLabel}
							</span>
						)}
					</React.Fragment>
				) : mounted ? (
					text
				) : (
					<React.Fragment>
						{_.map(text.split(''), (item, index) => (
							<span key={index}>{item}</span>
						))}
						<span>{moreLabel}</span>
					</React.Fragment>
				)}
			</div>
		</React.Fragment>
	)
}

CutText.propTypes = {
	text: (props, propName, componentName) => {
		if (!props.text && !props.children) {
			return new Error(`One of props 'text' or 'children' is required in '${componentName}'.`)
		}
	},
	children: (props, propName, componentName) => {
		if (!props.children && !props.text) {
			return new Error(`One of props 'children' or 'text' is required in '${componentName}'.`)
		}
	},
	rows: PropTypes.number,
	moreLabel: PropTypes.string,
}
CutText.defaultProps = {
	text: null,
	children: null,
	rows: 1,
	moreLabel: 'Learn more',
}

export { CutText }
