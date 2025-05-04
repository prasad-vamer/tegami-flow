;

import { Toaster } from "sonner";
import { useTemplates } from "src/hooks/useTemplates";
import { TemplateListTemplate } from "src/templates/template-list-template";

export default function TemplatesPage() {
  const {
    templates,
    pagination,
    isLoading,
    searchQuery,
    setSearchQuery,
    sortField,
    sortOrder,
    handleSortFieldChange,
    page,
    setPage,
    fetchTemplates,
    deleteTemplate,
    limit,
    setLimit,
  } = useTemplates();

  return (
    <>
      <TemplateListTemplate
        templates={templates}
        pagination={pagination}
        isLoading={isLoading}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortField={sortField}
        sortOrder={sortOrder}
        onSortFieldChange={handleSortFieldChange}
        page={page}
        onPageChange={setPage}
        onRefresh={fetchTemplates}
        onDelete={deleteTemplate}
        limit={limit}
        onLimitChange={setLimit}
      />
      <Toaster />
    </>
  );
}
