import { useTabsStore } from "@/store/tabs";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

interface AddButtonProps {
  url: string;
  label: string;
  onClick?: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ url, label, onClick }) => {
  const { addTab } = useTabsStore();
  const navigate = useNavigate();
  const onCreate = () => {
    navigate(url);
    addTab({ key: url, label });
    onClick?.();
  };
  return (
    <Button
      color="primary"
      variant="outlined"
      onClick={onCreate}
      style={{ margin: "5px 0" }}
    >
      {label}
    </Button>
  );
};
export default AddButton;
