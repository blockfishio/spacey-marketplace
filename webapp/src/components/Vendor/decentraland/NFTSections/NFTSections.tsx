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
      {[Section.ALL, Section.LAND].map(menuSection => (
        <MenuItem
          key={menuSection}
          value={menuSection}
          currentValue={section}
          onClick={onSectionClick}
        />
      ))}

      {/* {[Section.LAND, Section.PARCELS, Section.ESTATES].includes(section!)
        ? [Section.PARCELS, Section.ESTATES].map(menuSection => (
          <MenuItem
            key={menuSection}
            value={menuSection}
            currentValue={section}
            onClick={onSectionClick}
            isSub
          />
        ))
        : null} */}


      <MenuItem
        value={Section.BOARDINGPASS}
        currentValue={section}
        onClick={onSectionClick}
      />
      <MenuItem
        value={Section.CHEST}
        currentValue={section}
        onClick={onSectionClick}
      />


    </Menu>
  )
}

export default React.memo(NFTSections)
