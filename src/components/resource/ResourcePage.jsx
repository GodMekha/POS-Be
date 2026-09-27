import Pagination from "./Pagination.jsx";
import ResourceFormModal from "./ResourceFormModal.jsx";
import ResourceHeader from "./ResourceHeader.jsx";
import ResourceTable from "./ResourceTable.jsx";
import ResourceToolbar from "./ResourceToolbar.jsx";
import ResourceViewModal from "./ResourceViewModal.jsx";
import StatusModal from "./StatusModal.jsx";
import { Card, ConfirmModal, ErrorBox } from "../ui/index.js";
import { useResourcePage } from "../../hooks/resource/useResourcePage.js";
import { useAuthorizedResource } from "../../hooks/resource/useAuthorizedResource.js";

/**
 * ໜ້າ CRUD ທົ່ວໄປ — ປະກອບ component ຍ່ອຍເຂົ້າກັນ.
 * State ທັງໝົດຢູ່ໃນ useResourcePage (query / lookups / actions / modals)
 * ປຸ່ມຕ່າງໆສະແດງຕາມສິດ (useAuthorizedResource ຕັດ crud ທີ່ບໍ່ມີສິດອອກ)
 */
const ResourcePage = ({ resource: config }) => {
  const resource = useAuthorizedResource(config);
  const { query, lookups, actions, modals } = useResourcePage(resource);
  const { form, view, remove, status } = modals;

  const handleSaved = () => {
    form.close();
    actions.refresh();
  };

  const handleDelete = async () => {
    if (await actions.remove(remove.data)) remove.close();
  };

  const handleChangeStatus = async (value) => {
    if (await actions.changeStatus(status.data, value)) status.close();
  };

  return (
    <Card className="p-5 md:p-8">
      <ResourceHeader
        resource={resource}
        loading={query.loading}
        onReload={query.reload}
        onCreate={() => form.open(null)}
      />

      <ResourceToolbar resource={resource} query={query} lookups={lookups} />

      <ErrorBox>{query.error}</ErrorBox>

      <ResourceTable
        resource={resource}
        rows={query.rows}
        loading={query.loading}
        error={query.error}
        offset={query.offset}
        lookups={lookups}
        rowHandlers={{
          onView: view.open,
          onEdit: form.open,
          onDelete: remove.open,
          onToggle: actions.toggleActive,
          onChangeStatus: status.open,
        }}
      />

      <Pagination
        page={query.page}
        totalPage={query.totalPage}
        limit={query.limit}
        onPageChange={query.setPage}
        onLimitChange={query.setLimit}
      />

      {form.isOpen && (
        <ResourceFormModal
          resource={resource}
          row={form.data}
          lookups={lookups}
          presetValues={query.filters.values}
          onClose={form.close}
          onSaved={handleSaved}
        />
      )}

      {view.isOpen && <ResourceViewModal resource={resource} row={view.data} onClose={view.close} />}

      <ConfirmModal
        open={remove.isOpen}
        title="ຢືນຢັນການລຶບ"
        confirmLabel="ລຶບ"
        loading={actions.busy}
        onConfirm={handleDelete}
        onClose={remove.close}
      >
        <p className="text-slate-600 dark:text-slate-300">ທ່ານແນ່ໃຈບໍ່ວ່າຈະລຶບຂໍ້ມູນນີ້? ການລຶບບໍ່ສາມາດກູ້ຄືນໄດ້.</p>
        <p className="mt-2 text-xs font-mono text-slate-400">{remove.data?.[resource.idKey]}</p>
      </ConfirmModal>

      <StatusModal
        open={status.isOpen}
        title={resource.statusTitle}
        options={resource.statusOptions}
        current={status.data?.[resource.statusField ?? "status"]}
        busy={actions.busy}
        onSelect={handleChangeStatus}
        onClose={status.close}
      />
    </Card>
  );
};

export default ResourcePage;
