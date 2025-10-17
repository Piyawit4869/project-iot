import GlobalButton from "~/components/shared/global-button";
import type { TabKey } from "~/types/settings";

interface RenderHeaderButtonsProps {
  isEditing: boolean;
  handleClickEditButton: () => void;
  handleClickCancleButton: () => void;
  activeTab: TabKey;
}

export const RenderHeaderButtons = ({
  isEditing,
  handleClickEditButton,
  handleClickCancleButton,
  activeTab,
}: RenderHeaderButtonsProps) => {
  if (!isEditing) {
    return [
      <GlobalButton
        label="แก้ไข"
        key="edit-btn"
        type="button"
        onClick={handleClickEditButton}
      />,
    ];
  }

  return [
    <GlobalButton
      label="บันทึก"
      key="save-btn"
      type="submit"
      form={activeTab}
    />,
    <GlobalButton
      label="ยกเลิก"
      key="cancel-btn"
      type="button"
      className="ml-2"
      onClick={handleClickCancleButton}
      variant="secondary"
    />,
  ];
};
