import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const Site = () => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Site Title</label>
        <Input defaultValue="Artistic Portfolio | Frontend Developer" className="artistic-input" />
      </div>
      <div>
        <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Site Description</label>
        <Textarea
          defaultValue="An artistic portfolio showcasing frontend development work with traditional Burmese aesthetic"
          className="artistic-input"
          rows={3}
        />
      </div>
    </div>
  )
}

export default Site