import gql from 'graphql-tag'

export const GET_EVIDENCE_TYPES = gql`
	query evidenceType {
		all {
			id
			name
		}
	}
`

export const GET_SUBJECT_SECTION_EVIDENCES = gql`
	query evidence($pivot_id: Int!, $subject_section_id: Int!, $user_id: Int!) {
		subjectSection(pivot_id: $pivot_id, subject_section_id: $subject_section_id, user_id: $user_id) {
			id
			evidence
			subject_user_id
			sign_off
			created_at
			outcomes {
				id
				reference
			}
			user {
				id
				first_name
				last_name
				photo
			}
			type {
				id
				name
			}
		}
	}
`
