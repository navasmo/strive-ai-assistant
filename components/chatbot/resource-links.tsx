'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

interface Resource {
  title: string
  url: string
  imageUrl?: string
  description?: string
  id?: string
}

interface ResourceLinksProps {
  readonly resources: Resource[]
}

export function ResourceLinks({ resources }: Readonly<ResourceLinksProps>) {
  return (
    <div className="my-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">
        Helpful Resources
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource, index) => (
          <a
            key={resource.id ?? `resource-${resource.url}-${index}`}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors hover:border-purple-300 dark:hover:border-purple-600 group"
          >
            {resource.imageUrl && (
              <div className="h-24 w-full overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
                <Image 
                  src={resource.imageUrl} 
                  alt={resource.title}
                  fill
                  className="object-contain p-2"
                />
              </div>
            )}
            
            <div className="p-4 flex flex-col h-full">
              <h4 className="font-medium text-purple-700 dark:text-purple-400 mb-1 font-brand">
                {resource.title}
              </h4>
            
              {resource.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {resource.description}
                </p>
              )}
            
              <Button 
                variant="link" 
                className="text-blue-600 dark:text-blue-400 p-0 h-auto text-sm font-medium self-start mt-auto"
              >
                Visit resource <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
