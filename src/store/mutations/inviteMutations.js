import gql from 'graphql-tag'

export const INVITE_USERS = gql`
	mutation invite(
		$group: Int!
		$group_role: Int
		$active: Boolean
		$billing_increase_confirmed: Boolean
		$subjects: [SubjectInput]
		$users: [UserInviteInput!]
	) {
		inviteUsers(
			group: $group
			group_role: $group_role
			active: $active
			billing_increase_confirmed: $billing_increase_confirmed
			subjects: $subjects
			users: $users
		)
	}
`

export const ACCEPT_INVITE = gql`
	mutation invite($password: String!, $password_confirmation: String!, $token: String!) {
		accept(password: $password, password_confirmation: $password_confirmation, token: $token) {
			id
			first_name
			last_name
			username
			email
			photo
			created_at
			updated_at
			token
			account {
				id
				name
				photo
				role
				roleType
			}
		}
	}
`
