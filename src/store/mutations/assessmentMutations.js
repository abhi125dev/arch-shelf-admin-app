import gql from 'graphql-tag'

export const CREATE_ASSESSMENT = gql`
	mutation assessments($subject_section_id: Int!, $pivot_id: Int!) {
		create(subject_section_id: $subject_section_id, pivot_id: $pivot_id)
	}
`

export const GET_RANDOM_QUESTION = gql`
	mutation questions(
		$subject_section_id: Int!
		$random: Boolean
		$question_id: Int
		$answer: String
		$result: [Int]
		$depends: String
		$not_sure: Boolean
		$retake: Boolean
		$pivot_id: Int!
	) {
		random(
			subject_section_id: $subject_section_id
			random: $random
			question_id: $question_id
			answer: $answer
			result: $result
			depends: $depends
			not_sure: $not_sure
			retake: $retake
			pivot_id: $pivot_id
		) {
			id
			name
			countQuestions
			outcome_id
			completeQuestions
			type
			options {
				id
				answer
			}
		}
	}
`
