'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { pushToDataLayer } from '@/lib/gtm'

export function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    pushToDataLayer({
      event: 'page_view',
      page_path: pathname + searchParams.toString(),
    })
  }, [pathname, searchParams])

  return null
}
