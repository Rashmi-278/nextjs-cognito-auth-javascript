import React from 'react'

function clickHandler(e) {
  // Add your custom event handler code here - record analytics, etc
  console.log('ExternalLink.clickHandler:', e)
}

// interface ExternalLinkProps extends React.HTMLProps<HTMLAnchorElement> {
//   href: string // Forces href to be required - see "Gotchas"
//   children: React.ReactNode // Forces children to be required
// }

// eslint-disable-next-line react/display-name
const ExternalLink = React.forwardRef((props, ref) => {
  // Peel off the onClick handler if given
  const { onClick, ...rest } = props

  const wrappedOnClick = (e) => {
    if (onClick) {
      // If the consumer passed in onClick, call it
      onClick(e)
    }

    // Finally, call our External Handler
    clickHandler(e)
  }

  return <a ref={ref} {...rest} onClick={wrappedOnClick} />
})

export default ExternalLink