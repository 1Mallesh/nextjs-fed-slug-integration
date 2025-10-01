import React from 'react'

interface SlugcompProps {
    title?: string
}

export default function Slugcomp({title}: SlugcompProps) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}
