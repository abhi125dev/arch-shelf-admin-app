import gql from 'graphql-tag'

export const GET_BOOKMARKS = gql`
	query bookmarks {
		all {
			id
			outcome_id
			name
			description
			subjectSection {
				id
				name
				subject_id
				subject {
					name
				}
			}
		}
	}
`
export const GET_SUBJECT_SECTION_OUTCOME_ACTIVITY = gql`
	query outcomes($subject_section_id: Int!, $pivot_id: Int!, $user_id: Int!) {
		activityBySubjectSection(subject_section_id: $subject_section_id, pivot_id: $pivot_id, user_id: $user_id) {
			id
			created_at
			user {
				first_name
				last_name
			}
			causer {
				... on OutcomeType {
					id
					name
				}
			}
		}
	}
`
