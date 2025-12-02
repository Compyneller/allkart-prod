import { CompleteStoreCreationType } from "@repo/schema";
import { razorpayConfig } from "../../config/razorpay.config";

export const createRazorpayAccountService = async ({
  data,
  userEmail,
  category,
}: {
  data: CompleteStoreCreationType;
  category: string;
  userEmail: string;
}) => {
  try {
    const razorpayAccount = razorpayConfig.accounts.create({
      type: "route",
      email: userEmail,
      phone: Number(data?.addressDetails?.contact),
      legal_business_name: data?.storeDetails?.shop_name,
      profile: {
        category: category,
        addresses: {
          operation: {
            city: data?.addressDetails?.city!,
            state: data?.addressDetails?.state!,
            country: "India",
            postal_code: data?.addressDetails?.pincode!,
            street1: data?.addressDetails?.address!,
            street2: "test",
          },
        },
      },
      business_type: `online ${category} store`,
      contact_name: data?.addressDetails?.name!,
      contact_info: {
        chargeback: {
          email: userEmail,
        },

        refund: {
          email: userEmail,
        },

        support: {
          email: userEmail,

          phone: data?.addressDetails.contact!,
        },
      },

      legal_info: {
        pan: data?.kycDetails.pancard,
        gst: data?.kycDetails.gst || undefined,
      },
    });

    return razorpayAccount;
  } catch (error) {
    throw error;
  }
};
