import * as React from 'react'
import { Address } from 'web3x-es/address'
import { Badge, Row, Section, Header, Mana } from 'spacey-ui'
import { Profile } from 'spacey-dapps/dist/containers'
import { t } from 'spacey-dapps/dist/modules/translation/utils'
import { Props } from './Popup.types'
import './Popup.css'

export default class Popup extends React.PureComponent<Props> {
  render() {
    const { x, y, visible, tile, position } = this.props
    const id = `${tile.x},${tile.y}`

    // const isEstate = !!tile.estate_id
    let tilename = ""
    if (tile.estate_id) {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      const x = (parseInt(tile.estate_id) - 101) / 36
      const y = (parseInt(tile.estate_id) - 101) % 36
      tilename = t(
        'global.land_with_coords', {
        x: x !== undefined ? alphabet.charAt(x) : '', y: y !== undefined ? y : ''
      }
      )
    }
    return (
      <div
        className={`AtlasPopup ${position} ${tile.owner ? 'has-owner' : 'no-owner'
          }`}
        style={{ top: y, left: x, opacity: visible ? 1 : 0 }}
      >
        <Section className="land-name">
          <Row className="name-row">
            {/* <span className="name">
              {tile.name ||
                (!isEstate ? t('global.parcel') : t('global.estate'))}
            </span> */}
            <span className="name">
              {tile.name || tilename}
            </span>
            <Badge color="#37333D">
              <i className="pin" />
              {id}
            </Badge>
          </Row>
        </Section>

        <Section className="owner">
          <Header sub>{t('nft_page.owner')}</Header>
          <Profile
            address={tile.owner || Address.ZERO.toString()}
            debounce={500}
          />
        </Section>
        {tile.price ? (
          <Section className="price">
            <Header sub>{t('nft_page.price')}</Header>
            <Mana network={tile.network}>{tile.price.toLocaleString()}</Mana>
          </Section>
        ) : null}
      </div>
    )
  }
}
