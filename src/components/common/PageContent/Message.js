import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

const Message = ({ type, message, children }) => {
	const icons = {
		default: 'info circle',
		error: 'exclamation circle',
	}

	return (
		<div className={['page-message', type].join(' ')}>
			<Icon name={icons[type]} />

			<div>{children || message}</div>
		</div>
	)
}

Message.propTypes = {
	type: PropTypes.oneOf(['default', 'error']),
	message: (props, propName, componentName) => {
		if (!props.message && !props.children) {
			return new Error(`One of props 'message' or 'children' is required in '${componentName}'.`)
		}
	},
	children: (props, propName, componentName) => {
		if (!props.children && !props.message) {
			return new Error(`One of props 'children' or 'message' is required in '${componentName}'.`)
		}
	},
}
Message.defaultProps = {
	type: 'default',
	message: null,
	children: null,
}

export default Message
