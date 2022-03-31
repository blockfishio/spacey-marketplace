import React from 'react'
import { FooterProps } from 'spacey-ui'
import { Footer as BaseFooter } from 'spacey-dapps/dist/containers'
import * as tranlsations from '../../modules/translation/locales'

const locales = Object.keys(tranlsations)

const Footer = (props: FooterProps) => (
  <BaseFooter locales={locales} {...props} />
)

export default React.memo(Footer)
