import React from 'react'
import { Dropdown } from 'semantic-ui-react'

import './style.scss'

const CustomDropdown = dropdown => <Dropdown className="custom-dropdown" {...dropdown} />

export { CustomDropdown }
