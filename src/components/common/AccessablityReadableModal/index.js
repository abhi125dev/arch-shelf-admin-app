import React from 'react'
import { Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const AccessibilityReadableModal = ({ children, ...props }) => (
	<Modal {...props} mountNode={document.getElementById('root')}>
		{children}
	</Modal>
)

AccessibilityReadableModal.propTypes = {
	children: PropTypes.object,
}

AccessibilityReadableModal.defaultProps = {
	children: null,
}

export { AccessibilityReadableModal }
