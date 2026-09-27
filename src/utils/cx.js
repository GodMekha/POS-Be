/** ລວມ className ທີ່ເປັນ truthy: cx("a", cond && "b") */
export const cx = (...classes) => classes.filter(Boolean).join(" ");
