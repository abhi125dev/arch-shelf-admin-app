import { useState, useEffect } from 'react'
import _ from 'lodash'

export const useForm = (callback, validate = null, initialValues = {}) => {
	const [values, setValues] = useState(initialValues)
	const [savedValues, setSavedValues] = useState(values)
	const [changed, setChanged] = useState(false)
	const [errors, setErrors] = useState({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		if (_.isEmpty(errors) && isSubmitting) {
			callback()
			setSavedValues(values)
			setChanged(false)
			setIsSubmitting(false)
		}
	}, [isSubmitting, errors])

	useEffect(() => {
		if (isSubmitting) setIsSubmitting(false)
		if (!_.isEmpty(values) && !_.isEmpty(errors)) setErrors(validate(values))
	}, [values])

	const setNewValue = (name, value) =>
		setValues(values => {
			const newValues =
				value && {}.toString.call(value) === '[object Function]' ? value(values) : { ...values, [name]: value }

			setChanged(!_.isEqual(savedValues, newValues))

			return newValues
		})

	const handleSubmit = e => {
		if (e) e.preventDefault()
		if (validate) setErrors(validate(values))
		setIsSubmitting(true)
	}

	const handleChange = (e, { name, value }) => {
		e.persist()
		setNewValue(name, value)
	}

	const handleSelectChange = (e, { name, value }) => {
		e.persist()
		setNewValue(name, value)
	}

	const handleChangeRadioGroup = (e, { name, value }) => {
		e.persist()
		setNewValue(name, value)
	}

	const handleChangeCheckbox = (e, { name, checked }) => {
		e.persist()
		setNewValue(name, checked)
	}

	const handleChangeCheckboxGroup = (e, { name, value }, arrayOfValues) => {
		e.persist()

		if (value === 'all')
			return setNewValue(name, values =>
				JSON.stringify(values[name]) !== JSON.stringify(arrayOfValues) ? arrayOfValues : [],
			)

		setNewValue(
			name,
			_.includes(arrayOfValues, value) ? _.filter(arrayOfValues, v => v !== value) : [...arrayOfValues, value],
		)
	}

	const handleChangeToggle = (e, { name, checked }) => {
		e.persist()
		setNewValue(name, checked)
	}

	const handleImageChange = e => {
		e.persist()

		const reader = new FileReader()

		const {
			name,
			files: [file],
		} = e.target

		reader.onloadend = () => {
			setNewValue(name, {
				file,
				url: reader.result,
			})
		}

		if (file) reader.readAsDataURL(file)
	}

	const handleRepeaterChange = ({ name, values }) => {
		setNewValue(name, values)
	}

	const clearValues = (valuesNames = []) => {
		setValues(values => {
			let newValues = {}

			if (valuesNames.length) {
				_.forEach(valuesNames, item => {
					newValues[item] = ''
				})
			} else if (!_.isEmpty(initialValues)) {
				newValues = initialValues
			} else {
				_.forEach(values, (value, key) => {
					switch (true) {
						case typeof newValues[key] === 'number':
							newValues[key] = 0
							break
						case _.isArray(newValues[key]):
							newValues[key] = []
							break
						case _.isPlainObject(newValues[key]):
							newValues[key] = {}
							break
						default:
							newValues[key] = ''
					}
				})
			}

			setSavedValues(newValues)
			setChanged(false)

			return { ...values, ...newValues }
		})

		handleSubmit()
	}

	return {
		values,
		changed,
		errors,
		handleSubmit,
		handleChange,
		handleSelectChange,
		handleChangeRadioGroup,
		handleChangeCheckbox,
		handleChangeCheckboxGroup,
		handleChangeToggle,
		handleImageChange,
		handleRepeaterChange,
		clearValues,
		setNewValue,
		setValues,
		setErrors,
	}
}
