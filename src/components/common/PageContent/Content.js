import PropTypes from 'prop-types'

const Content = ({ children }) => children

Content.displayName = 'Content'
Content.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Content
