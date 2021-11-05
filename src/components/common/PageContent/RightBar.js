import PropTypes from 'prop-types'

const RightBar = ({ children }) => children

RightBar.displayName = 'RightBar'
RightBar.propTypes = {
	children: PropTypes.node.isRequired,
}

export default RightBar
