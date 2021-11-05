import React, { useState, Children } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'
import classnames from 'classnames'
import _ from 'lodash'

import Content from './Content'
import Message from './Message'
import RightBar from './RightBar'

import './style.scss'

const PageContent = ({ className, rightBarIcon, children }) => {
	const [rightBarOpen, setRightBarOpen] = useState(false)

	const Content = _.find(Children.toArray(children), ['type.displayName', 'Content'])
	const RightBar = _.find(Children.toArray(children), ['type.displayName', 'RightBar'])

	return (
		<div className={classnames('page-content', className, { 'has-right-bar': React.isValidElement(RightBar) })}>
			<div className="content">{React.isValidElement(Content) && Content}</div>

			{React.isValidElement(RightBar) && (
				<div className={classnames('right-bar', className, { open: rightBarOpen })}>
					{/* eslint-disable-next-line */}
					<div className="right-bar-toggle" onClick={() => setRightBarOpen(!rightBarOpen)}>
						<Icon name={rightBarOpen ? 'close' : rightBarIcon} />
					</div>

					<div className="right-bar-content">{RightBar}</div>
				</div>
			)}
		</div>
	)
}

PageContent.propTypes = {
	className: PropTypes.string,
	rightBarIcon: PropTypes.string,
	children: PropTypes.node.isRequired,
}
PageContent.defaultProps = {
	className: null,
	rightBarIcon: 'filter',
}

PageContent.Content = Content
PageContent.Message = Message
PageContent.RightBar = RightBar

export { PageContent }
