import gql from 'graphql-tag'

export const ADD_EVIDENCE = gql`
	mutation evidence(
		$user_id: Int!
		$outcomes_id: [Int!]
		$evidence: String
		$evidence_type: Int!
		$sign_off: Boolean
		$pivot_id: Int!
	) {
		create(
			user_id: $user_id
			outcomes_id: $outcomes_id
			evidence: $evidence
			evidence_type: $evidence_type
			sign_off: $sign_off
			pivot_id: $pivot_id
		)
	}
`

export const UPDATE_EVIDENCE = gql`
	mutation evidence($evidence_id: Int!, $evidence: String!) {
		update(evidence_id: $evidence_id, evidence: $evidence)
	}
`
