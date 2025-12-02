import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useAppDispatch, useAppSelector } from "store/hook";
import { previousStep } from "store/slices/storeCreationSlice";

const BackButton = () => {
  const dispatch = useAppDispatch();
  const { currentStep } = useAppSelector((state) => state.storeCreation);
  return (
    <Button
      size={"sm"}
      variant={"outline"}
      disabled={currentStep === 1}
      onClick={() => dispatch(previousStep())}>
      <ArrowLeft /> Previous
    </Button>
  );
};

export default BackButton;
