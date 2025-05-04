

import { Toaster } from "sonner"
import { useCandidates } from "src/hooks/useCandidates"
import { CandidateListTemplate } from "src/templates/candidate-list-template"

export default function CandidatesPage() {
  const {
    candidates,
    pagination,
    isLoading,
    searchQuery,
    setSearchQuery,
    sortField,
    sortOrder,
    handleSortFieldChange,
    page,
    setPage,
    fetchCandidates,
    deleteCandidate,
    limit,
    setLimit,
  } = useCandidates()

  return (
    <>
      <CandidateListTemplate
        candidates={candidates}
        pagination={pagination}
        isLoading={isLoading}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortField={sortField}
        sortOrder={sortOrder}
        onSortFieldChange={handleSortFieldChange}
        page={page}
        onPageChange={setPage}
        onRefresh={fetchCandidates}
        onDelete={deleteCandidate}
        limit={limit}
        onLimitChange={setLimit}
      />
      <Toaster />
    </>
  )
}
