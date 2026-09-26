import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Plus, Search, RefreshCw, Pencil, Trash2, Eye, ChevronLeft, ChevronRight,
  Power, ArrowRightLeft, ExternalLink, ImageOff, X,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useLookups, lookupOptions, invalidateLookup } from "../hooks/useLookups";
import { useList } from "../hooks/useList";
import { useDebounce } from "../hooks/useDebounce";
import {
  Badge, Button, Card, ErrorBox, Modal, cx, fmtDate, fmtNumber, inputCls, toast,
} from "./ui";

// ---------------------------------------------------------------------
// ສະແດງຄ່າໃນ cell ຕາມປະເພດ
// ---------------------------------------------------------------------
const CellValue = ({ col, row, lookups }) => {
  if (col.render) return col.render(row);
  const v = row[col.key];
  if (col.lookup) {
    const opt = lookupOptions(col.lookup, lookups[col.lookup]).find((o) => o.value === v);
    return opt ? opt.label : v ? String(v).slice(0, 8) : "-";
  }
  switch (col.type) {
    case "money":
    case "number":
      return fmtNumber(v);
    case "date":
      return <span className="text-slate-400 whitespace-nowrap">{fmtDate(v)}</span>;
    case "bool":
      return v ? <Badge color="green">ເປີດ</Badge> : <Badge color="red">ປິດ</Badge>;
    case "badge": {
      const o = col.options?.find((x) => x.value === v);
      return <Badge color={o?.color}>{o?.label ?? v ?? "-"}</Badge>;
    }
    case "image":
      return v ? (
        <img src={v} alt="" className="w-10 h-10 rounded-xl object-cover border border-slate-100 dark:border-slate-700" />
      ) : (
        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-300">
          <ImageOff size={16} />
        </div>
      );
    default:
      return v === null || v === undefined || v === "" ? "-" : String(v);
  }
};

// ---------------------------------------------------------------------
// ຟອມ ເພີ່ມ / ແກ້ໄຂ
// ---------------------------------------------------------------------
const initialForm = (resource, row, user) => {
  const f = {};
  resource.fields.forEach((fd) => {
    if (fd.type === "file") return;
    if (row) f[fd.name] = row[fd.name] ?? "";
    else if (fd.defaultFromUser) f[fd.name] = user?.user_id ?? "";
    else f[fd.name] = fd.default ?? "";
  });
  return f;
};

const FormModal = ({ resource, row, open, onClose, onSaved, lookups, presetFilters }) => {
  const { user } = useAuth();
  const isEdit = !!row;
  const [form, setForm] = useState({});
  const [files, setFiles] = useState({});
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    const f = initialForm(resource, row, user);
    // ຖ້າເປີດຈາກໜ້າທີ່ກອງໄວ້ (ເຊັ່ນ ?orderId=...) ໃຫ້ເລືອກໄວ້ລ່ວງໜ້າ
    if (!row && presetFilters) {
      resource.fields.forEach((fd) => {
        if (presetFilters[fd.name]) f[fd.name] = presetFilters[fd.name];
      });
    }
    setForm(f);
    setFiles({});
    setError("");
  }, [open, row, resource, user, presetFilters]);

  const setField = (name, value) => {
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      const patch = resource.onFieldChange?.(name, next, lookups);
      return patch ? { ...next, ...patch } : next;
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const missing = resource.fields.filter((fd) => {
      const req = isEdit ? fd.requiredOnEdit ?? (fd.type !== "file" && fd.required) : fd.required;
      if (!req) return false;
      if (fd.type === "file") return !files[fd.name];
      return form[fd.name] === "" || form[fd.name] === null || form[fd.name] === undefined;
    });
    if (missing.length) {
      setError("ກະລຸນາປ້ອນ: " + missing.map((m) => m.label).join(", "));
      return;
    }
    let body;
    if (resource.multipart) {
      body = new FormData();
      Object.entries(form).forEach(([k, v]) => body.append(k, v ?? ""));
      resource.fields
        .filter((fd) => fd.type === "file" && files[fd.name])
        .forEach((fd) => {
          const key = fd.uploadKey ? fd.uploadKey[isEdit ? "update" : "create"] : fd.name;
          body.append(key, files[fd.name]);
        });
    } else {
      body = { ...form };
    }
    setSaving(true);
    try {
      const crud = resource.crud; // ມາຈາກ src/service/<controller>Service.js
      if (isEdit) await crud.update(row[resource.idKey], body);
      else await crud.create(body);
      toast(isEdit ? "ແກ້ໄຂສຳເລັດ" : "ບັນທຶກສຳເລັດ");
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={(isEdit ? "ແກ້ໄຂ " : "ເພີ່ມ ") + resource.title}
      wide={resource.fields.length > 5}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} type="button">ຍົກເລີກ</Button>
          <Button type="submit" form="resource-form" loading={saving}>ບັນທຶກ</Button>
        </>
      }
    >
      <form id="resource-form" onSubmit={submit} className="space-y-4">
        <ErrorBox>{error}</ErrorBox>
        <div className={cx("grid gap-4", resource.fields.length > 5 && "sm:grid-cols-2")}>
          {resource.fields.map((fd) => {
            const req = isEdit ? fd.requiredOnEdit ?? (fd.type !== "file" && fd.required) : fd.required;
            const full = fd.type === "textarea" || fd.type === "file";
            return (
              <label key={fd.name} className={cx("block", full && "sm:col-span-2")}>
                <span className="block mb-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">
                  {fd.label} {req && <span className="text-red-500">*</span>}
                </span>
                <FieldInput
                  fd={fd}
                  value={form[fd.name]}
                  onChange={(v) => setField(fd.name, v)}
                  file={files[fd.name]}
                  onFile={(f) => setFiles((s) => ({ ...s, [fd.name]: f }))}
                  currentImage={isEdit ? row?.[fd.name] : null}
                  lookups={lookups}
                />
                {fd.hint && <span className="block mt-1 text-xs text-slate-400">{fd.hint}</span>}
              </label>
            );
          })}
        </div>
      </form>
    </Modal>
  );
};

const FieldInput = ({ fd, value, onChange, file, onFile, currentImage, lookups }) => {
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (!file) return setPreview(null);
    const u = URL.createObjectURL(file);
    setPreview(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  if (fd.type === "select") {
    const opts = fd.source ? lookupOptions(fd.source, lookups[fd.source]) : fd.options;
    return (
      <select className={inputCls} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
        <option value="">— ເລືອກ —</option>
        {opts?.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    );
  }
  if (fd.type === "textarea")
    return <textarea rows={3} className={inputCls} value={value ?? ""} placeholder={fd.placeholder} onChange={(e) => onChange(e.target.value)} />;
  if (fd.type === "file") {
    const img = preview || currentImage;
    return (
      <div className="flex items-center gap-4">
        {img ? (
          <img src={img} alt="" className="w-20 h-20 rounded-2xl object-cover border border-slate-200 dark:border-slate-700" />
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-300"><ImageOff /></div>
        )}
        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
          />
          {currentImage && <p className="mt-1 text-xs text-slate-400">API ບັງຄັບໃຫ້ອັບໂຫລດຮູບໃໝ່ທຸກຄັ້ງທີ່ແກ້ໄຂ</p>}
        </div>
      </div>
    );
  }
  return (
    <input
      type={fd.type === "number" ? "number" : fd.type === "password" ? "password" : "text"}
      step={fd.step}
      className={inputCls}
      value={value ?? ""}
      placeholder={fd.placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

// ---------------------------------------------------------------------
// ເບິ່ງລາຍລະອຽດ (getOne)
// ---------------------------------------------------------------------
const renderAny = (v) => {
  if (v === null || v === undefined || v === "") return "-";
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "string" && /^https?:\/\/.+\.(png|jpe?g|gif|webp|svg)$/i.test(v))
    return <img src={v} alt="" className="w-24 h-24 rounded-xl object-cover" />;
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}T/.test(v)) return fmtDate(v);
  if (Array.isArray(v)) return `${v.length} ລາຍການ`;
  if (typeof v === "object") return <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(v, null, 2)}</pre>;
  return String(v);
};

const ViewModal = ({ resource, row, onClose }) => {
  const [data, setData] = useState(null);
  const [warn, setWarn] = useState("");
  useEffect(() => {
    if (!row) return;
    setData(null);
    setWarn("");
    const id = row[resource.idKey];
    if (!resource.crud.getOne) return setData(row);
    resource.crud.getOne(id)
      .then(setData)
      .catch((e) => {
        setWarn("getOne ຜິດພາດ (" + e.message + ") — ສະແດງຂໍ້ມູນຈາກຕາຕະລາງແທນ");
        setData(row);
      });
  }, [row, resource]);
  return (
    <Modal open={!!row} onClose={onClose} title={"ລາຍລະອຽດ " + resource.title} wide>
      {warn && <div className="mb-3 text-xs text-amber-600">{warn}</div>}
      {!data ? (
        <p className="text-slate-400">ກຳລັງໂຫລດ...</p>
      ) : (
        <dl className="divide-y divide-slate-100 dark:divide-slate-800">
          {Object.entries(data)
            .filter(([k]) => k !== "password")
            .map(([k, v]) => (
              <div key={k} className="grid grid-cols-3 gap-4 py-2.5 text-sm">
                <dt className="text-slate-400 font-mono text-xs pt-0.5">{k}</dt>
                <dd className="col-span-2 text-slate-700 dark:text-slate-200 break-all">{renderAny(v)}</dd>
              </div>
            ))}
        </dl>
      )}
    </Modal>
  );
};

// ---------------------------------------------------------------------
// ໜ້າ CRUD ຫຼັກ
// ---------------------------------------------------------------------
const ResourcePage = ({ resource }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const ep = resource.crud; // ຟັງຊັນຈາກ service
  const filters = useMemo(() => resource.filters || [], [resource]);

  // ຄ່າກອງ ເກັບໄວ້ໃນ URL ເພື່ອໃຫ້ລິ້ງ ?orderId=... ໃຊ້ໄດ້
  const filterValues = useMemo(() => {
    const o = {};
    filters.forEach((f) => (o[f.name] = searchParams.get(f.name) || ""));
    return o;
  }, [filters, searchParams]);
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [searchInput, setSearchInput] = useState("");
  const search = useDebounce(searchInput.trim());
  const [formRow, setFormRow] = useState(undefined); // undefined=ປິດ, null=ເພີ່ມ, object=ແກ້ໄຂ
  const [viewRow, setViewRow] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const [statusRow, setStatusRow] = useState(null);
  const [busy, setBusy] = useState(false);

  const lookupKeys = useMemo(
    () => [
      ...resource.fields.filter((f) => f.source).map((f) => f.source),
      ...filters.filter((f) => f.source).map((f) => f.source),
      ...resource.columns.filter((c) => c.lookup).map((c) => c.lookup),
    ],
    [resource, filters]
  );
  const lookups = useLookups(lookupKeys);

  // ---- ດຶງລາຍການຜ່ານ hook useList + service ----
  // ຕົວກອງທີ່ມີ fetch ສະເພາະ (ເຊັ່ນ productService.getByCategory)
  const special = filters.find((f) => f.fetch && filterValues[f.name]);
  const fetcher = special ? special.fetch : ep.list;
  const params = useMemo(() => {
    if (special) return filterValues[special.name];
    const p = { page, limit, search: resource.noSearch ? undefined : search, startDate, endDate };
    filters.forEach((f) => !f.fetch && (p[f.name] = filterValues[f.name]));
    return p;
  }, [special, filterValues, page, limit, search, startDate, endDate, filters, resource.noSearch]);
  const { rows, totalPage, loading, error, reload: load } = useList(fetcher, params);

  // ກັບໄປໜ້າ 1 ເມື່ອຄົ້ນຫາໃໝ່
  useEffect(() => {
    setPage(1);
  }, [search]);

  const setParam = (name, value) => {
    const p = new URLSearchParams(searchParams);
    if (value) p.set(name, value);
    else p.delete(name);
    setSearchParams(p, { replace: true });
    setPage(1);
  };

  const afterMutation = () => {
    invalidateLookup(resource.key);
    load();
  };

  const doDelete = async () => {
    setBusy(true);
    try {
      await ep.remove(deleteRow[resource.idKey]);
      toast("ລຶບສຳເລັດ");
      setDeleteRow(null);
      afterMutation();
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setBusy(false);
    }
  };

  const doToggle = async (row) => {
    try {
      await ep.toggle(row[resource.idKey]);
      toast("ປ່ຽນສະຖານະສຳເລັດ");
      afterMutation();
    } catch (e) {
      toast(e.message, "error");
    }
  };

  const doStatus = async (status) => {
    setBusy(true);
    try {
      await ep.status(statusRow[resource.idKey], status);
      toast("ປ່ຽນສະຖານະສຳເລັດ");
      setStatusRow(null);
      afterMutation();
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setBusy(false);
    }
  };

  const activeFilterCount = filters.filter((f) => filterValues[f.name]).length + (startDate ? 1 : 0) + (endDate ? 1 : 0);
  const hasActions = ep.getOne || ep.update || ep.remove || ep.toggle || ep.status || resource.links;
  const Icon = resource.icon;
  const pages = buildPages(page, totalPage);

  return (
    <Card className="p-5 md:p-8">
      {/* ---------- Header ---------- */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center">
            <Icon size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{resource.title}</h1>
            <p className="text-xs text-slate-400 font-mono">{resource.api}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ghost" onClick={load} title="ໂຫລດໃໝ່">
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </Button>
          {ep.create && (
            <Button onClick={() => setFormRow(null)}>
              <Plus size={16} /> {resource.createLabel || "ເພີ່ມ" + resource.title}
            </Button>
          )}
        </div>
      </header>

      {/* ---------- Toolbar: search + filters ---------- */}
      <div className="flex flex-wrap items-end gap-3 mb-5">
        {!resource.noSearch && (
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className={inputCls + " pl-9"}
              placeholder={resource.searchPlaceholder || "ຄົ້ນຫາ..."}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        )}
        {filters.map((f) => {
          const opts = f.source ? lookupOptions(f.source, lookups[f.source]) : f.options;
          return (
            <label key={f.name} className="text-xs text-slate-500">
              <span className="block mb-1">{f.label}</span>
              <select className={inputCls + " min-w-[150px] max-w-[240px]"} value={filterValues[f.name]} onChange={(e) => setParam(f.name, e.target.value)}>
                <option value="">ທັງໝົດ</option>
                {opts?.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>
          );
        })}
        <label className="text-xs text-slate-500">
          <span className="block mb-1">ແຕ່ວັນທີ</span>
          <input type="date" className={inputCls} value={startDate} onChange={(e) => setParam("startDate", e.target.value)} />
        </label>
        <label className="text-xs text-slate-500">
          <span className="block mb-1">ຫາວັນທີ</span>
          <input type="date" className={inputCls} value={endDate} onChange={(e) => setParam("endDate", e.target.value)} />
        </label>
        {activeFilterCount > 0 && (
          <Button variant="ghost" onClick={() => { setSearchParams({}, { replace: true }); setPage(1); }}>
            <X size={14} /> ລ້າງຕົວກອງ ({activeFilterCount})
          </Button>
        )}
      </div>

      <ErrorBox>{error}</ErrorBox>

      {/* ---------- Table ---------- */}
      <div className="overflow-x-auto -mx-2 mt-2">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-slate-400 text-xs uppercase tracking-wide border-b border-slate-100 dark:border-slate-800">
              <th className="py-3 px-2 w-10">#</th>
              {resource.columns.map((c) => (
                <th key={c.key} className={cx("py-3 px-2 font-medium whitespace-nowrap", (c.type === "money" || c.type === "number") && "text-right")}>
                  {c.label}
                </th>
              ))}
              {hasActions && <th className="py-3 px-2 text-center">ດຳເນີນການ</th>}
            </tr>
          </thead>
          <tbody className="text-slate-600 dark:text-slate-300">
            {loading && rows.length === 0 &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={resource.columns.length + 2} className="py-3 px-2">
                    <div className="h-6 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
                  </td>
                </tr>
              ))}
            {!loading && rows.length === 0 && !error && (
              <tr>
                <td colSpan={resource.columns.length + 2} className="py-16 text-center text-slate-400">
                  ບໍ່ມີຂໍ້ມູນ
                </td>
              </tr>
            )}
            {rows.map((row, i) => (
              <tr key={row[resource.idKey] ?? i} className="border-b border-slate-50 dark:border-slate-800/60 hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                <td className="py-3 px-2 text-slate-400">{(page - 1) * limit + i + 1}</td>
                {resource.columns.map((c) => (
                  <td
                    key={c.key}
                    className={cx(
                      "py-3 px-2 max-w-[260px] truncate",
                      c.strong && "font-semibold text-slate-800 dark:text-white",
                      (c.type === "money" || c.type === "number") && "text-right tabular-nums"
                    )}
                  >
                    <CellValue col={c} row={row} lookups={lookups} />
                  </td>
                ))}
                {hasActions && (
                  <td className="py-2 px-2">
                    <div className="flex items-center justify-center gap-1">
                      {resource.links?.map((l) => (
                        <button key={l.label} onClick={() => navigate(l.to(row))} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 whitespace-nowrap">
                          <ExternalLink size={13} /> {l.label}
                        </button>
                      ))}
                      {ep.getOne && <IconBtn title="ເບິ່ງ" onClick={() => setViewRow(row)}><Eye size={16} /></IconBtn>}
                      {ep.status && <IconBtn title="ປ່ຽນສະຖານະ" onClick={() => setStatusRow(row)}><ArrowRightLeft size={16} /></IconBtn>}
                      {ep.toggle && (
                        <IconBtn title="ເປີດ/ປິດ" onClick={() => doToggle(row)} className={row[resource.toggleField || "active"] ? "text-emerald-500" : "text-slate-300"}>
                          <Power size={16} />
                        </IconBtn>
                      )}
                      {ep.update && <IconBtn title="ແກ້ໄຂ" onClick={() => setFormRow(row)}><Pencil size={16} /></IconBtn>}
                      {ep.remove && <IconBtn title="ລຶບ" onClick={() => setDeleteRow(row)} className="hover:!text-red-500"><Trash2 size={16} /></IconBtn>}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Pagination ---------- */}
      <footer className="flex flex-wrap items-center justify-between gap-3 mt-6 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          ສະແດງ
          <select className={inputCls + " !w-auto !py-1"} value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}>
            {[10, 15, 25, 50, 100].map((n) => <option key={n}>{n}</option>)}
          </select>
          ລາຍການ / ໜ້າ
        </div>
        <div className="flex items-center gap-1">
          <IconBtn disabled={page <= 1} onClick={() => setPage((p) => p - 1)}><ChevronLeft size={16} /></IconBtn>
          {pages.map((p, i) =>
            p === "…" ? (
              <span key={"e" + i} className="px-2">…</span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cx("w-8 h-8 rounded-lg text-sm", p === page ? "bg-blue-600 text-white" : "hover:bg-slate-100 dark:hover:bg-slate-800")}
              >
                {p}
              </button>
            )
          )}
          <IconBtn disabled={page >= totalPage} onClick={() => setPage((p) => p + 1)}><ChevronRight size={16} /></IconBtn>
        </div>
      </footer>

      {/* ---------- Modals ---------- */}
      {ep.create || ep.update ? (
        <FormModal
          resource={resource}
          row={formRow}
          open={formRow !== undefined}
          onClose={() => setFormRow(undefined)}
          onSaved={() => { setFormRow(undefined); afterMutation(); }}
          lookups={lookups}
          presetFilters={filterValues}
        />
      ) : null}

      <ViewModal resource={resource} row={viewRow} onClose={() => setViewRow(null)} />

      <Modal
        open={!!deleteRow}
        onClose={() => setDeleteRow(null)}
        title="ຢືນຢັນການລຶບ"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteRow(null)}>ຍົກເລີກ</Button>
            <Button variant="danger" loading={busy} onClick={doDelete}>ລຶບ</Button>
          </>
        }
      >
        <p className="text-slate-600 dark:text-slate-300">
          ທ່ານແນ່ໃຈບໍ່ວ່າຈະລຶບຂໍ້ມູນນີ້? ການລຶບບໍ່ສາມາດກູ້ຄືນໄດ້.
        </p>
        <p className="mt-2 text-xs font-mono text-slate-400">{deleteRow?.[resource.idKey]}</p>
      </Modal>

      <Modal open={!!statusRow} onClose={() => setStatusRow(null)} title="ປ່ຽນສະຖານະ">
        <div className="grid grid-cols-2 gap-3">
          {resource.statusOptions?.map((o) => (
            <button
              key={o.value}
              disabled={busy}
              onClick={() => doStatus(o.value)}
              className={cx(
                "p-4 rounded-2xl border-2 text-left transition-colors",
                statusRow?.status === o.value ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10" : "border-slate-100 dark:border-slate-800 hover:border-slate-300"
              )}
            >
              <Badge color={o.color}>{o.label}</Badge>
              <div className="mt-2 text-xs text-slate-400 font-mono">{o.value}</div>
            </button>
          ))}
        </div>
      </Modal>
    </Card>
  );
};

const IconBtn = ({ className, children, ...p }) => (
  <button
    className={cx("p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none", className)}
    {...p}
  >
    {children}
  </button>
);

function buildPages(page, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out = [1];
  const s = Math.max(2, page - 1);
  const e = Math.min(total - 1, page + 1);
  if (s > 2) out.push("…");
  for (let i = s; i <= e; i++) out.push(i);
  if (e < total - 1) out.push("…");
  out.push(total);
  return out;
}

export default ResourcePage;
