import ResponsiveModal from "../ResponsiveModal";


interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SummaryModal = ({ isOpen, setIsOpen }: Props) => {
  return (
    <ResponsiveModal title="AI Summary" open={isOpen} onOpenChange={setIsOpen}>
      <div>ssss</div>
    </ResponsiveModal>
  );
};

export default SummaryModal;
