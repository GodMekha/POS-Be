# POS — ເວັບຫຼັງບ້ານ (React + Vite + Tailwind)

ເວັບຫຼັງບ້ານທີ່ເຊື່ອມຕໍ່ກັບ **api-pos** ຄົບທຸກ controller (16 ໂຕ).

## ເລີ່ມໃຊ້ງານ
```bash
# 1) ເປີດ api-pos ກ່ອນ (port 3000)
cd api-pos && npm start

# 2) ເປີດເວັບ (port 8000 — ກົງກັບ CORS ຂອງ API)
cd POS
npm install
npm run dev        # http://localhost:8000
```
ຖ້າ API ບໍ່ຢູ່ `http://localhost:3000` ໃຫ້ copy `.env.example` ເປັນ `.env` ແລ້ວແກ້ `VITE_API_BASE_URL` (ຫຼື ແກ້ໃນ `src/service/api/baseUrl.js`).

## ໂຄງສ້າງ `src/view` — 1 ໂຟນເດີ ຕໍ່ 1 controller (16 ອັນ)
```
src/view/
├─ auth/                  1  Auth           → page/Auth.jsx, page/Login.jsx, page/Profile.jsx
├─ category/              2  Category       → page/Category.jsx
├─ customer/              3  Customer       → page/Customer.jsx
├─ historyInInventory/    4  HistoryInInventory
├─ historyInProduct/      5  HistoryInProduct
├─ inventory/             6  Inventory
├─ order/                 7  Order
├─ orderDetail/           8  OrderDetail
├─ package/               9  Package
├─ part/                  10 Part
├─ product/               11 Product
├─ purchase/              12 Purchase
├─ purchaseDetail/        13 PurchaseDetail
├─ sell/                  14 Sell
├─ sellDetail/            15 SellDetail
├─ supply/                16 Supply
└─ dashboard/             ໜ້າຫຼັກ (ພາບລວມ)
```
ແຕ່ລະໂຟນເດີ controller ມີ:
- `config.js` — endpoint ຂອງ controller, ຄໍລຳຕາຕະລາງ, ຟິວໃນຟອມ, ຕົວກອງ
- `page/<Name>.jsx` — ໜ້າຂອງ controller ນັ້ນ

## `src/service` — ຕໍ່ base URL ແລະ ເອີ້ນ API
```
src/service/
├─ api/
│  ├─ baseUrl.js        BASE_URL (+ /api/v1) — ແກ້ບ່ອນນີ້ ຫຼື ຕັ້ງ VITE_API_BASE_URL ໃນ .env
│  └─ apiClient.js      request(), http.get/post/put/delete, ແນບ token, ຈັດການ error
├─ authService.js ... supplyService.js   (16 ໄຟລ໌ — 1 ຕໍ່ 1 controller, ກົງກັບ route ຂອງ api-pos ທຸກເສັ້ນ)
└─ index.js
```
ຕົວຢ່າງ: `await productService.getAll({ page: 1, limit: 15 })`, `await orderService.updateStatus(id, "success")`

## `src/hooks`
```
src/hooks/
├─ useAuth.js        user, token, login(), logout()
├─ useList.js        ດຶງລາຍການ + loading/error/reload
├─ useOne.js         ດຶງ 1 ລາຍການ
├─ useMutation.js    useMutation(fn), useActions(service)
├─ useDebounce.js    ຊ່ອງຄົ້ນຫາ
├─ useLookups.js     ຂໍ້ມູນ dropdown (ມີ cache)
└─ controller/       16 ໄຟລ໌: use<Name>List, use<Name>, use<Name>Actions
```
ຕົວຢ່າງ: `const { rows, loading } = useProductList({ limit: 15 });`

ໄຟລ໌ອື່ນ:
| ໄຟລ໌ | ໜ້າທີ່ |
|---|---|
| `src/config/resources.js` | ລວມ config ທັງ 16 ແລະ ຂໍ້ມູນ dropdown |
| `src/config/constants.js` | ສະຖານະ, role, ສະກຸນເງິນ ແລະ helper |
| `src/components/ResourcePage.jsx` | ໜ້າ CRUD ທີ່ທຸກ page ໃຊ້ຮ່ວມກັນ |
| `src/router/router.jsx` | route ຂອງທັງ 16 ໜ້າ |
