# POS ຫຼັງບ້ານ (React + Vite) — Clean Code

ລະບົບຫຼັງບ້ານສຳລັບ `api-pos` (16 controller). State ທັງໝົດຈັດການຜ່ານ **Custom Hooks**
+ store ຂະໜາດນ້ອຍ (`useSyncExternalStore`) — ບໍ່ມີ Context Provider, ບໍ່ມີ Redux.

## ເລີ່ມຕົ້ນ

```bash
cp .env.example .env      # VITE_API_BASE_URL=http://localhost:3000
npm install
npm run dev               # http://localhost:8000 (api-pos ເປີດ CORS ໃຫ້ port ນີ້)
```

## ໂຄງສ້າງ

```
src/
├─ main.jsx                  entry
├─ app/                      App, router, ProtectedRoute
├─ api/                      httpClient (fetch + token + ApiError), config (BASE_URL), normalizeList
├─ services/                 1 ໄຟລ໌ = 1 controller ຂອງ api-pos (ມີແຕ່ endpoint, ບໍ່ມີ logic)
├─ store/                    Global state (ຢູ່ນອກ React)
│   ├─ createStore.js        createStore() + useStore()  ← ຫົວໃຈຂອງ state management
│   ├─ authStore.js          token, user, login(), logout()
│   ├─ themeStore.js         light / dark / system (ຕາມເຄື່ອງ) + ຟັງການປ່ຽນຂອງ OS
│   └─ toastStore.js         toast.success() / toast.error()
├─ hooks/
│   ├─ common/               useAuth, useTheme, useToasts, useAsync, useList, useOne,
│   │                        useMutation, useLookups, useDebounce, useDisclosure, useSidebar ...
│   ├─ entities/             useProductList / useProduct / useProductActions ... (16 controller, ສ້າງຈາກ factory)
│   └─ resource/             state ຂອງໜ້າ CRUD: useResourcePage → useResourceQuery, useResourceForm,
│                            useResourceActions, useResourceDetail, usePagination, useUrlFilters
├─ components/
│   ├─ ui/                   Button, Badge, Card, Modal, ConfirmModal, Select, ... (presentational)
│   ├─ resource/             ResourcePage ແຍກເປັນ Header / Toolbar / Table / RowActions / Pagination / Modals
│   └─ feedback/Toaster.jsx
├─ features/
│   ├─ auth/                 pages/ (Login, Profile) + hooks/ (useAuthForm, useProfile)
│   ├─ dashboard/            pages/ + components/ + hooks/ (useDashboard) + lib/ (metrics, chartOptions)
│   └─ resources/            configs/ (16 ໄຟລ໌), registry.js, lookups.js, lib/form.js (pure functions)
├─ layouts/                  MainLayout, Sidebar (ຈັດກຸ່ມຕາມ `group`), Navbar
├─ constants/                ORDER_STATUS, ROLES, CURRENCIES, PAGE_SIZES, ຄໍລຳທີ່ໃຊ້ຊ້ຳ
└─ utils/                    format, date, pagination, storage, cx
```

### ທິດທາງການເພິ່ງພາ (dependency flow)

```
pages / components  →  hooks  →  store / services  →  api (httpClient)
     (UI ລ້ວນ)         (state)       (ຂໍ້ມູນ)            (network)
```

- **Component** ບໍ່ເອີ້ນ service ໂດຍກົງ ແລະ ບໍ່ມີ business logic — ຮັບຂໍ້ມູນຈາກ hook ແລ້ວສະແດງຜົນ.
- **Hook** ເປັນເຈົ້າຂອງ state (loading / error / form / modal / filter).
- **lib/*.js** ເປັນ pure function (ຄິດໄລ່, validate, ສ້າງ payload) → test ງ່າຍ.
- **httpClient** ບໍ່ຮູ້ຈັກ React: ເມື່ອ token ໝົດອາຍຸຈະເອີ້ນ `onUnauthorized` ທີ່ authStore ລົງທະບຽນໄວ້.

## ຕົວຢ່າງການໃຊ້ Hook

```jsx
// Global state
const { user, isAuth, login, logout } = useAuth();
const { isDark, toggleTheme } = useTheme();
toast.success("ບັນທຶກສຳເລັດ");            // ເອີ້ນໄດ້ທຸກບ່ອນ

// ຂໍ້ມູນຈາກ API
const { rows, totalPage, loading, error, reload } = useProductList({ page: 1, limit: 15 });
const { data: product } = useProduct(productId);
const { insert, update, remove, loading: saving } = useProductActions();

// modal
const confirm = useDisclosure();   // confirm.open(row) / confirm.isOpen / confirm.data / confirm.close()
```

### ສ້າງ store ໃໝ່

```js
// store/cartStore.js
export const cartStore = createStore({ items: [] });
export const cartActions = {
  add: (item) => cartStore.setState(({ items }) => ({ items: [...items, item] })),
};
// hooks/common/useCart.js
export const useCart = () => ({ items: useStore(cartStore, (s) => s.items), ...cartActions });
```

## ເພີ່ມໜ້າ CRUD ໃໝ່

1. ເພີ່ມ service ໃນ `src/services/xxxService.js`
2. ສ້າງ config ໃນ `src/features/resources/configs/xxx.js` (columns, fields, filters, crud)
3. ເພີ່ມເຂົ້າ array `RESOURCES` ໃນ `registry.js` — **router ແລະ sidebar ຈະສ້າງໃຫ້ເອງ**

ຄີ `crud` ທີ່ຮອງຮັບ: `list, getOne, create, update, remove, toggleActive, changeStatus`
(ປຸ່ມໃນຕາຕະລາງຈະສະແດງສະເພາະຄີທີ່ມີ).

## Dark mode

- ປຸ່ມ theme ຢູ່ Navbar ແລະ ໜ້າ Login: ກົດວົນ **ແຈ້ງ → ມືດ → ຕາມເຄື່ອງ** (ຄ່າເລີ່ມຕົ້ນ = ຕາມເຄື່ອງ)
- ຈື່ຄ່າໄວ້ໃນ localStorage (`theme`); script ໃນ `index.html` ໃສ່ class `.dark` ກ່ອນ React ໂຫລດ → ບໍ່ກະພິບ
- `color-scheme` ເຮັດໃຫ້ date picker, `<select>`, scrollbar ຂອງ browser ເປັນສີມືດນຳ
- ຂຽນ style ດ້ວຍ Tailwind `dark:` ເຊັ່ນ `bg-white dark:bg-slate-900`

```jsx
const { theme, isDark, setTheme, cycleTheme } = useTheme();
setTheme("dark");   // "light" | "dark" | "system"
```
