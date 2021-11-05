import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import moment from 'moment'

import { downloadCertificate } from 'Queries/rest/certificate'

import './style.scss'

const CertificateItem = ({ id, subject_name, issuer, created_at, subject: { img, feedback_link }, isManager }) => (
	<div className="certificate-item">
		<div className="preview-img" style={{ backgroundImage: `url('${img}')` }} />
		<div className="info">
			<span className="name">{subject_name}</span>
			<p className="description">Issue Date: {moment(created_at).format('DD.MM.YYYY')}</p>
			<p className="description">Issuer: {issuer}</p>
			<Button basic color="blue" content="Download" onClick={() => downloadCertificate(id)} />
			{!isManager && feedback_link && (
				<a href={feedback_link} target="_blank" rel="noopener noreferrer">
					Give Course Feedback
				</a>
			)}
		</div>
	</div>
)

CertificateItem.propTypes = {
	subject_name: PropTypes.string.isRequired,
	issuer: PropTypes.string.isRequired,
	created_at: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	subject: PropTypes.object,
	isManager: PropTypes.object,
}

CertificateItem.defaultProps = {
	subject: {},
	isManager: false,
}

export { CertificateItem }
