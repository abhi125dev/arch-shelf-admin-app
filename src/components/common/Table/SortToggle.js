import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'
import classnames from 'classnames'
import _ from 'lodash'

const SortToggle = ({ className, activeParam, children, label, sortParam, onSort }) => (
	<button type="button" className={classnames('table-sort-toggle', className)} onClick={() => onSort(sortParam)}>
		{children ? children : <span>{label}</span>}
		{_.isEqual(activeParam.name, sortParam) && (
			<Icon name={`angle ${activeParam.order === 'asc' ? 'down' : 'up'}`} />
		)}
	</button>
)

SortToggle.propTypes = {
	className: PropTypes.string,
	activeParam: PropTypes.shape({
		name: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
		order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	}).isRequired,
	children: (props, propName, componentName) => {
		if (!props.children && !props.label) {
			return new Error(`One of props 'children' or 'label' was not specified in '${componentName}'.`)
		}
	},
	label: (props, propName, componentName) => {
		if (!props.label && !props.children) {
			return new Error(`One of props 'label' or 'children' was not specified in '${componentName}'.`)
		}
	},
	sortParam: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
	onSort: PropTypes.func.isRequired,
}
SortToggle.defaultProps = {
	className: null,
	children: null,
	label: null,
}

export default SortToggle
