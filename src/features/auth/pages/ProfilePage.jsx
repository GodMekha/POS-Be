import { KeyRound, Trash2, UserCircle } from "lucide-react";
import { useProfile } from "../hooks/useProfile.js";
import { Badge, Button, Card, ConfirmModal, ErrorBox, inputClass } from "../../../components/ui/index.js";
import { formatDate } from "../../../utils/format.js";
import { ROLES, findOption } from "../../../constants/options.js";

const InfoRow = ({ label, children }) => (
  <div className="flex justify-between">
    <dt className="text-slate-400">{label}</dt>
    <dd className="text-slate-600 dark:text-slate-300">{children}</dd>
  </div>
);

const RoleBadge = ({ role }) => {
  const option = findOption(ROLES, role);
  return <Badge color={option?.color}>{option?.label ?? role}</Badge>;
};

const ProfileCard = ({ info }) => (
  <Card className="p-6">
    <div className="flex flex-col items-center text-center">
      <UserCircle size={72} className="text-blue-500" />
      <h2 className="mt-3 text-xl font-bold text-slate-800 dark:text-white">{info?.username}</h2>
      <p className="text-slate-500 dark:text-slate-400">{info?.phoneNumber}</p>
      {info?.role && (
        <div className="mt-2">
          <RoleBadge role={info.role} />
        </div>
      )}
    </div>
    <dl className="mt-6 space-y-2 text-sm">
      <InfoRow label="ລະຫັດ">
        <span className="font-mono text-xs">{info?.user_id?.slice(0, 13)}…</span>
      </InfoRow>
      <InfoRow label="ສ້າງເມື່ອ">{formatDate(info?.createdAt)}</InfoRow>
    </dl>
  </Card>
);

const PASSWORD_FIELDS = [
  { name: "oldPassword", placeholder: "ລະຫັດຜ່ານເກົ່າ" },
  { name: "newPassword", placeholder: "ລະຫັດຜ່ານໃໝ່" },
  { name: "confirm", placeholder: "ຢືນຢັນລະຫັດຜ່ານໃໝ່" },
];

const ProfilePage = () => {
  const profile = useProfile();

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <ProfileCard info={profile.info} />

      <Card className="p-6 lg:col-span-2">
        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white mb-4">
          <KeyRound size={20} /> ປ່ຽນລະຫັດຜ່ານ
        </h3>
        <form onSubmit={profile.changePassword} className="space-y-4 max-w-md">
          <ErrorBox>{profile.error}</ErrorBox>
          {PASSWORD_FIELDS.map((field) => (
            <input
              key={field.name}
              type="password"
              className={inputClass}
              placeholder={field.placeholder}
              value={profile.password[field.name]}
              onChange={profile.bindPassword(field.name)}
              required
            />
          ))}
          <Button type="submit" loading={profile.saving}>
            ບັນທຶກ
          </Button>
        </form>

        <section className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold text-red-600 mb-2">ເຂດອັນຕະລາຍ</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">ລຶບບັນຊີຂອງທ່ານອອກຈາກລະບົບຖາວອນ.</p>
          <Button variant="danger" onClick={() => profile.deleteConfirm.open()}>
            <Trash2 size={16} /> ລຶບບັນຊີ
          </Button>
        </section>
      </Card>

      <ConfirmModal
        open={profile.deleteConfirm.isOpen}
        title="ລຶບບັນຊີ?"
        confirmLabel="ລຶບຖາວອນ"
        onConfirm={profile.deleteAccount}
        onClose={profile.deleteConfirm.close}
      >
        <p className="text-slate-600 dark:text-slate-300">
          ບັນຊີ ແລະ ການເຂົ້າສູ່ລະບົບຂອງທ່ານຈະຖືກລຶບ ແລະ ບໍ່ສາມາດກູ້ຄືນໄດ້.
        </p>
      </ConfirmModal>
    </div>
  );
};

export default ProfilePage;
