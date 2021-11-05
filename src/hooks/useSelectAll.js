import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import FormComponent from 'Helpers/form'

const useSelectAll = (list, changeList) => {
	const [selectAll, setSelectAll] = useState(false)

	useEffect(() => {
		const newList = _.map(list, item => ({ ...item, selected: selectAll }))

		changeList(newList)
	}, [selectAll])

	return <FormComponent.Checkbox checked={selectAll} onChange={() => setSelectAll(() => !selectAll)} />
}

export default useSelectAll
