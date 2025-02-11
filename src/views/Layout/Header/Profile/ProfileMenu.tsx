import LogoutForm from "@/components/dashboard_ui/Logout";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface DropMenuProps {
  onClose: () => void;
}

const ProfileMenu: React.FC<DropMenuProps> = ({ onClose }) => {
  return (
    <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
      <Link
        href="/profile"
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faUser} className="text-gray-500" />
        <span>Profile</span>
      </Link>
      <LogoutForm />
    </div>
  );
};

export default ProfileMenu;
