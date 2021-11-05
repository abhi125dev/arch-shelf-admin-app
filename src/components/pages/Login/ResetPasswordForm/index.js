import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { Button } from 'semantic-ui-react'

import { RESET_PASSWORD_REQUEST_MUTATION } from 'Mutations/authMutations'
import { useForm } from 'Hooks'
import FormComponent from 'Helpers/form'
import { PageMetaTags } from 'Common'

const validate = values => {
	const errors = {}

	if (!values.email || !/\S+@\S+\.\S+/.test(values.email)) errors.email = true

	return errors
}

const ResetPasswordForm = () => {
	const [showMessage, setShowMessage] = useState(false)
	const [resetPasswordRequest] = useMutation(RESET_PASSWORD_REQUEST_MUTATION)
	const {
		values: { email },
		errors,
		handleSubmit,
		handleChange,
	} = useForm(
		() =>
			resetPasswordRequest({ variables: { email } }).then(({ data: { sendLinkEmail } }) => {
				if (sendLinkEmail) {
					setShowMessage(true)
				}
			}),
		validate,
	)

	return (
		<React.Fragment>
			<PageMetaTags title="Reset password" />
			<span className="title">Reset password</span>
			<span className="description">Please enter your email address and click send.</span>
			{showMessage && (
				<span className="success-message">
					The link was successfully sent! <br /> If you don&apos;t receive your password in a few minutes
					please check your spam / junk folder
				</span>
			)}
			<form onSubmit={handleSubmit}>
				<FormComponent
					name="email"
					value={email || ''}
					onChange={handleChange}
					placeholder="Email address"
					size="large"
					error={errors.email}
				/>
				<Button size="big" fluid>
					Send
				</Button>
			</form>
			<p className="bottom-info">
				<Link className="link" to="/login">
					Back to Sign In
				</Link>
			</p>
			<span className="description">
				This Reset Password link will expire in 60 minutes, for security reasons.
			</span>
		</React.Fragment>
	)
}

export default withRouter(ResetPasswordForm)
