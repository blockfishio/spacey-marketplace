import React from 'react'

import { Section } from '../../../../modules/vendor/decentraland/routing/types'
import { Menu } from '../../../Menu'
// import { DropdownMenu } from '../../../Menu/DropdownMenu'
import { MenuItem } from '../../../Menu/MenuItem'
import { Props } from './NFTSections.types'

const NFTSections = (props: Props) => {
  const { section, onSectionClick } = props
  return (
    <Menu className="NFTSections">
      {[Section.ALL, Section.CHEST, Section.LAND, Section.BOARDINGPASS, Section.BUILDING, Section.TOWER, Section.TRAP].map(menuSection => (
        <MenuItem
          key={menuSection}
          value={menuSection}
          currentValue={section}
          onClick={onSectionClick}
        />
      ))}








    </Menu>
  )
}

export default React.memo(NFTSections)
