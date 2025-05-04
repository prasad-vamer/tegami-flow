

import { Toaster } from "sonner"
import { useLogs } from "src/hooks/useLogs"
import { LogsListTemplate } from "src/templates/logs-list-template"

export default function LogsPage() {
  const {
    logs,
    pagination,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    sortField,
    sortOrder,
    handleSortFieldChange,
    handleSortSelection,
    page,
    setPage,
    limit,
    setLimit,
    fetchLogs,
  } = useLogs()

  return (
    <>
      <LogsListTemplate
        logs={logs}
        pagination={pagination}
        isLoading={isLoading}
        error={error}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortField={sortField}
        sortOrder={sortOrder}
        onSortFieldChange={handleSortFieldChange}
        onSortSelection={handleSortSelection}
        page={page}
        onPageChange={setPage}
        limit={limit}
        onLimitChange={setLimit}
        onRefresh={fetchLogs}
      />
      <Toaster />
    </>
  )
}
