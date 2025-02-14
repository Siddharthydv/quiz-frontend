import { Button } from "@/components/ui/button";
import { useUser } from "@/userContext";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Logout
    </Button>
  );
}
