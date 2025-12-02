"use client";
import Steppers from "@/components/steppers";
import ShopAddress from "@/components/store/forms/address-form";
import BankDetailForm from "@/components/store/forms/bank-form";
import CreateStoreForm from "@/components/store/forms/create-store-form";
import SellerForm from "@/components/store/forms/seller-form";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hook";
import { resetStoreCreation } from "store/slices/storeCreationSlice";

const CreateStoreLayout = () => {
  //   const dispatch = useAppDispatch();
  //   const { currentStep } = useAppSelector((state) => state.storeCreation);

  //   useEffect(() => {
  //     // Cleanup function runs when component unmounts
  //     return () => {
  //       // Only reset if process is incomplete
  //       if (currentStep < 4) {
  //         dispatch(resetStoreCreation());
  //       }
  //     };
  //   }, [currentStep, dispatch]);

  const steps = [
    { comp: <SellerForm />, title: "Seller Details" },
    {
      comp: <CreateStoreForm />,
      title: "Create Store",
    },
    { comp: <ShopAddress />, title: "Store address" },
    { comp: <BankDetailForm />, title: "Bank details" },
  ];

  return (
    <div className="py-20">
      <Steppers steps={steps} />
    </div>
  );
};

export default CreateStoreLayout;
