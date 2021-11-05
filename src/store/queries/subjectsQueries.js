import gql from 'graphql-tag'

export const GET_SUBJECT_FOR_ASSESSMENT = gql`
	query subjectSection($id: Int!, $limit: Int, $user_id: Int) {
		byId(id: $id, limit: $limit, user_id: $user_id) {
			subject {
				id
				name
				auto_sign_off_enabled
			}
		}
	}
`

export const GET_SUBJECT_SECTION_FOR_BREADCRUMBS = gql`
	query subjectSection($id: Int!, $limit: Int, $user_id: Int) {
		byId(id: $id, limit: $limit, user_id: $user_id) {
			subject {
				id
				name
				auto_sign_off_enabled
			}
		}
	}
`

export const GET_SUBJECT_SECTION_BY_ID = gql`
	query subjectSection($id: Int!, $pivot_id: Int!, $limit: Int, $user_id: Int) {
		byId(id: $id, limit: $limit, user_id: $user_id, pivot_id: $pivot_id) {
			key
			id
			subject_id
			name
			description
			img
			subject {
				auto_sign_off_enabled
				name
			}
			type
			retake
			is_start
			is_completed
			outcomes {
				id
			}
		}
	}
`

export const GET_SUBJECT_SECTION_OUTCOMES = gql`
	query subjectSection($id: Int!, $pivot_id: Int!, $user_id: Int) {
		byId(id: $id, pivot_id: $pivot_id, user_id: $user_id) {
			id
			name
			type
			link
			verify
			subject {
				id
				name
			}
			outcomes {
				id
				name
				reference
				status
			}
		}
	}
`

export const GET_SECTION_OUTCOMES_MANAGER = gql`
	query subjectSection($id: Int!, $pivot_id: Int!, $user_id: Int!) {
		byId(pivot_id: $pivot_id, id: $id, user_id: $user_id) {
			key
			id
			name
			verify
			type
			is_verified
			is_imported
			date_verified
			verifiedBy {
				id
				first_name
				last_name
			}
			outcomes {
				id
				name
				reference
				observable
				learning_link
				observationStatus
				status
				userAnswers {
					id
					answer_ids
					answer
					dont_know
					marked_as_correct
					result
					question {
						id
						name
						type
						options {
							id
							answer
							right
						}
					}
				}
				userEvidence {
					id
					evidence
					created_at
				}
				managerEvidence {
					id
					created_at
					user {
						id
						first_name
						last_name
						photo
					}
				}
				lastActive {
					id
					created_at
				}
			}
		}
	}
`

export const GET_SECTION_OUTCOME_BY_ID = gql`
	query outcomes($id: Int!, $pivot_id: Int!, $subjectSectionId: Int!) {
		byId(id: $id, pivot_id: $pivot_id, subject_section_id: $subjectSectionId) {
			id
			name
			learningContent {
				id
				name
				description
				bookmark {
					id
				}
			}
		}
	}
`

export const GET_REFRESH_PERIOD_OPTIONS = gql`
	query subjects {
		refreshPeriodOptions {
			key
			text
			value
		}
	}
`
