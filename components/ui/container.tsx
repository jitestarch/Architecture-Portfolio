
import React from 'react'

function Container({children , className}: {children: React.ReactNode , className?: string}) {
  return (
    <section className={`mx-auto max-w-5xl px-6  ${className}`}>
        {children}
    </section>
  )
}

export default Container