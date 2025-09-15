import { useTabsStore } from "@/store/tabs";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";

interface EditButtonProps<T> {
  record: T;
  url: string;
  label: string
  children?: React.ReactNode;
}

const EditButton = <T,>({ record, url, label, children }: EditButtonProps<T>) => {
  const navigate = useNavigate();
  const { addTab } = useTabsStore();

  const onClick = () => {
    navigate(url, { state: record });
    addTab({ key: url, label, state: record  });
  };
  return <Typography.Link onClick={onClick}>{children}</Typography.Link>;
};

export default EditButton;
