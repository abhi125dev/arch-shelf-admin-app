import gql from 'graphql-tag'

export const GET_USERS_LIST = gql`
	query users($filters: UserFiltersInput, $limit: Int) {
		allForManager(filters: $filters, limit: $limit) {
			data {
				data {
					id
					first_name
					last_name
					photo
					created_at
					account {
						key
						id
						is_active
						role
						learner_notifications
					}
					groups {
						key
						id
						name
						role
					}
					lastActive {
						id
						created_at
					}
				}
				total
				per_page
			}
			total_count
		}
	}
`

export const GET_ALL_USERS_LIST = gql`
	query users($filters: UserFiltersInput, $limit: Int) {
		allForManager(filters: $filters, limit: $limit) {
			full_data {
				id
				first_name
				last_name
				photo
				created_at
				account {
					key
					id
					is_active
					role
				}
				groups {
					key
					id
					name
					role
				}
				lastActive {
					id
					created_at
				}
			}
			total_count
		}
	}
`

export const GET_USERS_SUBJECTS_ACTIVITY_LIST = gql`
	query users($filters: ActivityFiltersInput) {
		subjectsActivityList(filters: $filters) {
			data {
				data {
					key
					id
					first_name
					last_name
					photo
					subject {
						key
						pivot_id
						id
						name
						due
						date_completed
						progress
						lastActive {
							id
							created_at
						}
					}
				}
				total
				per_page
			}
			total_count
		}
	}
`

export const GET_USER_CARD_INFO = gql`
	query users($id: Int!) {
		byId(id: $id) {
			id
			first_name
			last_name
			photo
		}
	}
`

export const GET_USER_ACTIVITY = gql`
	query users($user_id: Int!, $limit: Int) {
		logs(user_id: $user_id, limit: $limit) {
			id
			description
			log_name
			subject_id
			created_at
			user_subjects_id
			causer {
				... on SubjectType {
					id
					name
				}
				... on SubjectSectionType {
					id
					name
					subject_id
				}
				... on OutcomeType {
					id
					name
				}
				... on GroupType {
					id
					name
				}
				... on UserType {
					id
					first_name
					last_name
				}
				... on EvidenceType {
					id
					outcomes {
						id
						name
					}
				}
			}
		}
	}
`

export const GET_AVAILABLE_ACCOUNTS = gql`
	query users($id: Int!) {
		byId(id: $id) {
			id
			accounts {
				id
				name
				photo
				roles {
					role
				}
			}
		}
	}
`

export const GET_SUBJECTS_FOR_FILTER = gql`
	query subjects {
		currentAccount {
			id
			name
		}
	}
`

export const GET_USER_CERTIFICATES = gql`
	query users {
		certificates {
			id
			issuer
			subject_name
			created_at
			subject {
				id
				img
				feedback_link
			}
		}
	}
`
