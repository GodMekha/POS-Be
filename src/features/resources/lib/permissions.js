import { CRUD_ACTION } from "../../../constants/permissions.js";

/**
 * ຕັດຄຳສັ່ງ crud ທີ່ຜູ້ໃຊ້ບໍ່ມີສິດອອກ → ປຸ່ມທີ່ກ່ຽວຂ້ອງຈະຫາຍໄປເອງ
 * resource.crudPermissions ໃຊ້ override ເຊັ່ນ { changeStatus: ["role", "update"] }
 */
export const filterCrudByPermission = (resource, can, resources = []) => {
  const required = (name) => resource.crudPermissions?.[name] ?? [resource.permission, CRUD_ACTION[name]];
  const allowed = Object.entries(resource.crud).filter(([name]) => can(...required(name)));
  const links = resource.links?.filter((link) => canOpenPath(linkPath(link), resources, can));
  return { ...resource, crud: Object.fromEntries(allowed), links };
};

/** ລາຍການ resource ທີ່ຜູ້ໃຊ້ເປີດເບິ່ງໄດ້ */
export const readableResources = (resources, can) => resources.filter((r) => can(r.permission));

/** path ປາຍທາງຂອງ link ("/sells?customerId=1" → "/sells") */
const linkPath = (link) => link.to({}).split("?")[0];

/** ເປີດໜ້ານີ້ໄດ້ບໍ່ (path ທີ່ບໍ່ແມ່ນ resource → ໄດ້) */
export const canOpenPath = (path, resources, can) => {
  const target = resources.find((r) => r.path === path);
  return !target || can(target.permission);
};
