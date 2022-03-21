import { gql } from '@apollo/client';

export const GET_PARENTS_CHILDREN = gql`
	query Query {
		parentsChildren {
			children {
				id
				firstName
				lastName
			}
		}
	}
`;

export const GET_YEAR_GROUP_DATA = gql`
	query Query {
		yearGroups {
			id
			title
		}
	}
`;

export const GET_ALL_PARENT_ABSENCE_REQUESTS = gql`
	query Query {
		parentsChildren {
			children {
				id
				firstName
				lastName
				yearGroup {
					title
				}
				absenceRequests {
					id
					type
					description
					dateTime
					status
				}
			}
		}
	}
`;

export const GET_ALL_CHILDREN = gql`
	query YearGroups {
		parentsChildren {
			children {
				id
				firstName
				lastName
				dob
				profileImageUrl
				yearGroup {
					id
					title
					subjects
				}
				medical {
					id
					allergies
					disabilities
					additionalInfo
					medications
				}
				absenceRequests {
					type
					description
					dateTime
					status
				}
			}
		}
	}
`;

export const GET_TEACHER_STUDENTS_ABSENCE_REQUESTS = gql`
	query Query($yearGroupId: ID!) {
		teacherStudents(yearGroupId: $yearGroupId) {
			id
			firstName
			lastName
			yearGroup {
				title
			}
			absenceRequests {
				id
				type
				description
				dateTime
				status
			}
		}
	}
`;

export const GET_TEACHER_STUDENTS = gql`
	query Query($yearGroupId: ID!) {
		teacherStudents(yearGroupId: $yearGroupId) {
			firstName
			lastName
			id
			dob
		}
	}
`;

export const VIEW_CHILD = gql`
	query ViewChild($studentId: ID!) {
		viewChild(studentId: $studentId) {
			id
			firstName
			lastName
			dob
			profileImageUrl
			yearGroup {
				id
				title
				subjects
			}
			medical {
				id
				disabilities
				allergies
				medications
				additionalInfo
			}
			absenceRequests {
				id
				type
				description
				dateTime
				status
			}
		}
	}
`;
