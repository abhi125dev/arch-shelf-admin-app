import gql from 'graphql-tag'

export const VERIFY_SUBJECT_SECTION = gql`
	mutation subjectSectionVerify($subject_section_id: Int!, $pivot_id: Int!, $user_id: Int!) {
		verify(subject_section_id: $subject_section_id, user_id: $user_id, pivot_id: $pivot_id)
	}
`
