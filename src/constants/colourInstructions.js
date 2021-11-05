const status = [
	{ colour: '#bfc5d2', explanation: 'Not Started' },
	{ colour: '#E3342F', explanation: 'Requires Action' },
	{ colour: '#F6993F', explanation: 'Sign Off Required' },
	{ colour: '#38C172', explanation: 'Signed Off' },
]

const targetCompletionStatus = [
	{ colour: '#E3342F', explanation: 'Target completion passed' },
	{ colour: '#F6993F', explanation: 'Target completion within 2 weeks' },
	{ colour: '#38C172', explanation: 'Signed Off' },
]

export { status, targetCompletionStatus }
