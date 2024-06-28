import { Button } from "antd";
import { CSSProperties, FC } from "react";
import { PlusCircleFilled } from "@ant-design/icons";

interface CreateButtonProps {
  label: string;
}

export const CreateButton: FC<CreateButtonProps> = (props: CreateButtonProps) => {
  const { label } = props;

  return (
    <div style={styles.container}>
      <Button
        type="primary"
        icon={<PlusCircleFilled />}
        style={styles.button}
      >
        {label}
      </Button>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%", // Ensures the container takes the full width of its parent
  },
  button: {
    fontSize: "18px",
    marginRight: 30,
    backgroundColor: "#19142a",
    borderColor: "#1c2c5c",
    borderRadius: "10px",
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
};
