import React, { useEffect, useState } from 'react'
import { CustomPaginator } from 'Common'

export const usePagination = (list, totalCount, perPage = 15) => {
	const [listActivePage, setListActivePage] = useState(1)

	useEffect(() => {
		setListActivePage(1)
	}, [list])

	const sliceFinishPosition = perPage * listActivePage
	const sliceStartPosition = sliceFinishPosition - perPage

	const paginatedList = list.slice(sliceStartPosition, sliceFinishPosition)

	const paginator = (
		<CustomPaginator
			activePage={listActivePage}
			length={list.length}
			pageChangeHandler={setListActivePage}
			perPage={perPage}
			totalCount={totalCount}
		/>
	)

	return {
		list: paginatedList,
		paginator,
	}
}
