import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = ''
}: PaginationProps) {
  if (totalPages <= 1) return null

  const maxVisiblePages = 5
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  const handlePageClick = (page: number, e: React.MouseEvent) => {
    e.preventDefault()
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
    }
  }

  // Generate page numbers to show
  const pageNumbers = []
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * 12 + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(currentPage * 12, (currentPage - 1) * 12 + 12)}
            </span>{' '}
            of <span className="font-medium">{totalPages * 12}</span> results
          </p>
        </div>
        
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => handlePageClick(currentPage - 1, e)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </Button>
          
          {/* First page */}
          {startPage > 1 && (
            <>
              <Button
                variant={currentPage === 1 ? 'default' : 'outline'}
                size="sm"
                onClick={(e) => handlePageClick(1, e)}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium"
              >
                1
              </Button>
              {startPage > 2 && (
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
                </span>
              )}
            </>
          )}
          
          {/* Middle pages */}
          {pageNumbers.map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? 'default' : 'outline'}
              size="sm"
              onClick={(e) => handlePageClick(page, e)}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium"
            >
              {page}
            </Button>
          ))}
          
          {/* Last page */}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
                </span>
              )}
              <Button
                variant={currentPage === totalPages ? 'default' : 'outline'}
                size="sm"
                onClick={(e) => handlePageClick(totalPages, e)}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium"
              >
                {totalPages}
              </Button>
            </>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => handlePageClick(currentPage + 1, e)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </Button>
        </nav>
      </div>
    </div>
  )
}
