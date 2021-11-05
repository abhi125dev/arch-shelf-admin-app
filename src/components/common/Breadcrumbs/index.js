import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { withContext } from 'Context'

import './style.scss'

const Breadcrumbs = ({ breadcrumbs }) => {
	if (!breadcrumbs.length) return null

	return (
		<div className="breadcrumbs">
			<Link to="/dashboard">Dashboard</Link>
			<span>&nbsp;/&nbsp;</span>
			{_.map(breadcrumbs, (item, index) => (
				<React.Fragment key={item.name + index}>
					{index !== breadcrumbs.length - 1 ? (
						<>
							<Link to={item.path}>{item.name}</Link>
							<span>&nbsp;/&nbsp;</span>
						</>
					) : (
						<span>{item.name}</span>
					)}
				</React.Fragment>
			))}
		</div>
	)
}

Breadcrumbs.propTypes = {
	breadcrumbs: PropTypes.arrayOf(
		PropTypes.exact({
			name: PropTypes.string.isRequired,
			path: PropTypes.string,
		}),
	).isRequired,
}

const BreadcrumbsContext = withContext(
	([
		{
			app: { breadcrumbs },
		},
	]) => ({ breadcrumbs }),
	Breadcrumbs,
)

export { BreadcrumbsContext as Breadcrumbs }
