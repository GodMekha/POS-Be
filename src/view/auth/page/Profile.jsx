import { useEffect, useState } from "react";
import { KeyRound, Trash2, UserCircle } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { authService } from "../../../service";
import { Badge, Button, Card, ErrorBox, Modal, fmtDate, inputCls, toast } from "../../../components/ui";

const Profile = () => {
  const { user, logout } = useAuth();
  const [info, setInfo] = useState(user);
  const [pw, setPw] = useState({ oldPassword: "", newPassword: "", confirm: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);

  useEffect(() => {
    if (!user?.user_id) return;
    authService.getOne(user.user_id).then(setInfo).catch(() => {});
  }, [user]);

  const changePassword = async (e) => {
    e.preventDefault();
    setError("");
    if (pw.newPassword !== pw.confirm) return setError("ລະຫັດຜ່ານໃໝ່ບໍ່ກົງກັນ");
    setSaving(true);
    try {
      await authService.changePassword({ oldPassword: pw.oldPassword, newPassword: pw.newPassword });
      toast("ປ່ຽນລະຫັດຜ່ານສຳເລັດ");
      setPw({ oldPassword: "", newPassword: "", confirm: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteAccount = async () => {
    try {
      await authService.deleteMe();
      toast("ລຶບບັນຊີແລ້ວ");
      logout();
    } catch (err) {
      toast(err.message, "error");
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <Card className="p-6">
        <div className="flex flex-col items-center text-center">
          <UserCircle size={72} className="text-blue-500" />
          <h2 className="mt-3 text-xl font-bold text-slate-800 dark:text-white">{info?.username}</h2>
          <p className="text-slate-500">{info?.phoneNumber}</p>
          {info?.role && <div className="mt-2"><Badge color="blue">{info.role}</Badge></div>}
        </div>
        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-slate-400">ລະຫັດ</dt><dd className="font-mono text-xs text-slate-600 dark:text-slate-300">{info?.user_id?.slice(0, 13)}…</dd></div>
          <div className="flex justify-between"><dt className="text-slate-400">ສ້າງເມື່ອ</dt><dd className="text-slate-600 dark:text-slate-300">{fmtDate(info?.createdAt)}</dd></div>
        </dl>
      </Card>

      <Card className="p-6 lg:col-span-2">
        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white mb-4"><KeyRound size={20} /> ປ່ຽນລະຫັດຜ່ານ</h3>
        <form onSubmit={changePassword} className="space-y-4 max-w-md">
          <ErrorBox>{error}</ErrorBox>
          <input type="password" className={inputCls} placeholder="ລະຫັດຜ່ານເກົ່າ" value={pw.oldPassword} onChange={(e) => setPw({ ...pw, oldPassword: e.target.value })} required />
          <input type="password" className={inputCls} placeholder="ລະຫັດຜ່ານໃໝ່" value={pw.newPassword} onChange={(e) => setPw({ ...pw, newPassword: e.target.value })} required />
          <input type="password" className={inputCls} placeholder="ຢືນຢັນລະຫັດຜ່ານໃໝ່" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} required />
          <Button type="submit" loading={saving}>ບັນທຶກ</Button>
        </form>

        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold text-red-600 mb-2">ເຂດອັນຕະລາຍ</h3>
          <p className="text-sm text-slate-500 mb-3">ລຶບບັນຊີຂອງທ່ານອອກຈາກລະບົບຖາວອນ.</p>
          <Button variant="danger" onClick={() => setConfirmDel(true)}><Trash2 size={16} /> ລຶບບັນຊີ</Button>
        </div>
      </Card>

      <Modal
        open={confirmDel}
        onClose={() => setConfirmDel(false)}
        title="ລຶບບັນຊີ?"
        footer={<><Button variant="ghost" onClick={() => setConfirmDel(false)}>ຍົກເລີກ</Button><Button variant="danger" onClick={deleteAccount}>ລຶບຖາວອນ</Button></>}
      >
        <p className="text-slate-600 dark:text-slate-300">ບັນຊີ ແລະ ການເຂົ້າສູ່ລະບົບຂອງທ່ານຈະຖືກລຶບ ແລະ ບໍ່ສາມາດກູ້ຄືນໄດ້.</p>
      </Modal>
    </div>
  );
};

export default Profile;
