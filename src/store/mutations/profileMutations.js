import gql from 'graphql-tag'

export const UPDATE_PROFILE_MUTATION = gql`
	mutation default(
		$id: Int!
		$first_name: String!
		$last_name: String!
		$username: String
		$email: String
		$secondary_email: String
		$active: Boolean
		$manager_notifications: Boolean
		$password: String
		$password_confirmation: String
		$photo: Upload
		$accessibility: Boolean
		$group: Int
		$group_role: Int
		$start_date: String
	) {
		updateProfile(
			id: $id
			first_name: $first_name
			last_name: $last_name
			username: $username
			email: $email
			secondary_email: $secondary_email
			active: $active
			manager_notifications: $manager_notifications
			password: $password
			password_confirmation: $password_confirmation
			photo: $photo
			accessibility: $accessibility
			group: $group
			group_role: $group_role
			start_date: $start_date
		) {
			photo
		}
	}
`

export const CREATE_PROFILE_MUTATION = gql`
	mutation users(
		$first_name: String!
		$last_name: String!
		$username: String
		$email: String
		$active: Boolean
		$password: String
		$password_confirmation: String
		$group: Int
		$group_role: Int
		$subjects: [SubjectInput]
	) {
		createProfile(
			first_name: $first_name
			last_name: $last_name
			username: $username
			email: $email
			active: $active
			password: $password
			password_confirmation: $password_confirmation
			group: $group
			group_role: $group_role
			subjects: $subjects
		)
	}
`
