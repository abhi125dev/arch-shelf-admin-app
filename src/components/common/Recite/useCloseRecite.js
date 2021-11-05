import { useCallback } from 'react'

export default (onAccept, onCancel) =>
	useCallback(() => {
		const Recite = window.Recite

		if (!Recite) return
		Recite.PlayerControls.hide()
		const disabled = window.Recite.Controls.disableOverlay()
		setTimeout(() => {
			Recite.Gui.Modal.show(
				'About to close!',
				'You are about to close the Recite Me toolbar. ' +
					'Are you sure you wish to continue? ' +
					'This will cause the page to be refreshed and you will lose any unsaved data.',
				'OK',
				'Cancel',
				function() {
					if (typeof onAccept === 'function') {
						onAccept()
					}
				},
				function() {
					Recite.Controls.reEnableOverlay(disabled)
					if (typeof onCancel === 'function') {
						onCancel()
					}
				},
			)
		}, 0)
	}, [onAccept, onCancel])
