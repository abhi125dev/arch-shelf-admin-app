import { Pagination } from 'semantic-ui-react'
import React from 'react'
import PropTypes from 'prop-types'

const CustomPaginator = ({ length, perPage, activePage, pageChangeHandler, totalCount }) => {
	const finishPosition = perPage * activePage
	const startPosition = finishPosition - perPage + 1

	const onPageChange = (e, { activePage }) => {
		pageChangeHandler(activePage)
	}

	return (
		<div className="pagination-wrap">
			{length / perPage > 1 && (
				<Pagination
					activePage={activePage}
					totalPages={Math.ceil(length / perPage)}
					onPageChange={onPageChange}
				/>
			)}
			<p>
				Showing {startPosition} to {finishPosition > length ? length : finishPosition} of {length} entries
				(filtered from {totalCount} total entries)
			</p>
		</div>
	)
}

CustomPaginator.propTypes = {
	length: PropTypes.number.isRequired,
	perPage: PropTypes.number.isRequired,
	activePage: PropTypes.number.isRequired,
	totalCount: PropTypes.number.isRequired,
	pageChangeHandler: PropTypes.func.isRequired,
}

export { CustomPaginator }
