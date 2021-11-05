import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import { withContext } from 'Context'
import { signInSuccessAction } from 'Actions/authActions'
import { SIGN_IN_MUTATION, CREATE_NEW_PASSWORD_MUTATION } from 'Mutations/authMutations'
import { useForm } from 'Hooks'
import FormComponent from 'Helpers/form'
import { PageMetaTags } from 'Common'

const validate = values => {
	let errors = {}
	const requiredFields = ['password', 'password_confirmation']
	requiredFields.forEach(field => {
		if (!values[field]) errors[field] = true
	})
	if (values.password !== values.password_confirmation) errors.password_confirmation = true

	return errors
}

const CreateNewPasswordForm = ({ match, location, signInSuccess }) => {
	const {
		params: { token },
	} = match
	const [loading, setLoading] = useState(false)
	const searchParams = new URLSearchParams(location.search)
	const getEmail = searchParams.get('email')
	const [signInMutation] = useMutation(SIGN_IN_MUTATION)
	const [createNewPasswordRequest] = useMutation(CREATE_NEW_PASSWORD_MUTATION)
	const {
		values: { password, password_confirmation },
		errors,
		handleSubmit,
		handleChange,
	} = useForm(() => {
		setLoading(true)
		createNewPasswordRequest({
			variables: { email: getEmail, token, password, password_confirmation },
		})
			.then(({ data: { reset } }) => {
				if (Boolean(reset) === true) signIn(getEmail, password)
			})
			.catch(error => {
				console.log('error', error)
			})
			.finally(() => {
				console.log('error')
			})
	}, validate)

	const signIn = (login, password) => {
		signInMutation({ variables: { login, password } })
			.then(({ data: { signIn } }) => {
				signInSuccess(signIn)
			})
			.catch(error => {
				console.log('error', error)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<React.Fragment>
			<PageMetaTags title="Reset password" />
			<span className="title">Create new password</span>
			<span className="description">Please enter new password.</span>
			<form onSubmit={handleSubmit}>
				<FormComponent
					name="password"
					type="password"
					value={password || ''}
					onChange={handleChange}
					placeholder="New Password"
					size="large"
					error={errors.password}
				/>
				<FormComponent
					name="password_confirmation"
					type="password"
					value={password_confirmation || ''}
					onChange={handleChange}
					placeholder="Confirm Password"
					size="large"
					error={errors.password_confirmation}
				/>
				<Button size="big" loading={loading} disabled={loading} fluid>
					Create password
				</Button>
			</form>
		</React.Fragment>
	)
}

CreateNewPasswordForm.propTypes = {
	signInSuccess: PropTypes.func.isRequired,
	match: PropTypes.shape().isRequired,
	location: PropTypes.shape().isRequired,
}

export default withContext(
	([, dispatch]) => ({
		// actions
		signInSuccess: data => signInSuccessAction(data, dispatch),
	}),
	CreateNewPasswordForm,
)
