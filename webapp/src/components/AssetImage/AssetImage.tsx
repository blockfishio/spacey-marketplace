import React from 'react'
import { Loader } from 'spacey-ui'
import { LazyImage } from 'react-lazy-images'


import { Props } from './AssetImage.types'
import './AssetImage.css'

// 1x1 transparent pixel
const PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII='

const NFTImage = (props: Props) => {
  const {
    image,

  } = props







  return (
    <LazyImage
      src={image}
      // alt={getNFTName(nft)}
      debounceDurationMs={1000}
      placeholder={({ ref }) => (
        <div ref={ref}>
          <Loader size="small" active />
        </div>
      )}
      actual={({ imageProps }) => (
        <img className="image"  {...imageProps} />
      )}
    />
  )
}



// the purpose of this wrapper is to make the div always be square, by using a 1x1 transparent pixel
const NFTImageWrapper = (props: Props) => {
  const { image, className, ...rest } = props

  let classes = 'NFTImage'
  if (className) {
    classes += ' ' + className
  }

  return (
    <div className={classes}>
      <img src={PIXEL} alt="pixel" className="pixel" />
      <div className="image-wrapper">
        <NFTImage image={image} {...rest} />
      </div>
    </div>
  )
}

NFTImage.defaultProps = {
  isDraggable: false,
  withNavigation: false,
  zoom: 0.5,
  isSmall: false,
  showMonospace: false
}

export default React.memo(NFTImageWrapper)
