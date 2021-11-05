import gql from 'graphql-tag'

export const SIGN_IN_MUTATION = gql`
	mutation auth($login: String!, $password: String!) {
		signIn(login: $login, password: $password) {
			id
			first_name
			last_name
			username
			email
			secondary_email
			photo
			created_at
			updated_at
			token
			account {
				id
				name
				photo
				manager_notifications
				role
				roleType
			}
		}
	}
`

export const SIGN_OUT_MUTATION = gql`
	mutation {
		signOut
	}
`

export const RESET_PASSWORD_REQUEST_MUTATION = gql`
	mutation auth_password($email: String!) {
		sendLinkEmail(email: $email)
	}
`

export const CREATE_NEW_PASSWORD_MUTATION = gql`
	mutation auth_password($email: String!, $token: String!, $password: String!, $password_confirmation: String!) {
		reset(email: $email, token: $token, password: $password, password_confirmation: $password_confirmation)
	}
`
