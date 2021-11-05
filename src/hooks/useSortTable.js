import { useState, useEffect } from 'react'
import _ from 'lodash'

export const useSortTable = array => {
	const [list, setList] = useState(array)
	const [activeParam, setActiveParam] = useState({
		name: '',
		order: 'asc',
	})

	useEffect(() => {
		const isParamsArray = _.isArray(activeParam.name)
		const params = isParamsArray ? [...activeParam.name] : [activeParam.name]
		const order = isParamsArray ? Array(activeParam.name.length).fill(activeParam.order) : [activeParam.order]

		setList(activeParam.name ? _.orderBy(array, params, order) : array)
	}, [activeParam, array])

	const handleSortTable = e => {
		const paramName = _.get(e, 'currentTarget.dataset.sortParam', e)

		const newActiveParam = { ...activeParam }

		if (_.isEqual(newActiveParam.name, paramName)) {
			switch (newActiveParam.order) {
				case 'asc':
					newActiveParam.order = 'desc'
					break
				case 'desc':
					newActiveParam.name = ''
					newActiveParam.order = 'asc'
					break
			}
		} else {
			newActiveParam.name = paramName
			newActiveParam.order = 'asc'
		}

		setActiveParam(newActiveParam)
	}

	return {
		list,
		activeParam,
		handleSortTable,
	}
}
