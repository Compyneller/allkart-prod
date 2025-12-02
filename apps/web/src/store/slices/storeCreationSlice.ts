import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Step 1: KYC Details
interface KycDetails {
    pancard: string;
    aadhar: string;
    gst?: string
}

// Step 2: Store Details
interface StoreDetails {
    shop_name: string;
    categoryId: string;
    home_delivery: boolean;
    delivery_charge?: number;
    handling_charge?: number;
    free_delivery_after?: number;
}

// Step 3: Address Details
interface AddressDetails {
    name: string;
    contact: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    lat: number;
    long: number;
    district: string;
    landmark?: string;
}


// Step 4: Bank Details
interface BankDetails {
    name: string;
    account_number: string;
    ifsc_code: string;
    bank_name: string;
    branch: string;
}

export interface StoreCreationState {
    currentStep: number;
    kycDetails: KycDetails;
    storeDetails: StoreDetails;
    addressDetails: AddressDetails;
    bankDetails: BankDetails;
    isSubmitting: boolean;
    error: string | null;
}

const initialState: StoreCreationState = {
    currentStep: 1,
    kycDetails: {} as KycDetails,
    storeDetails: {} as StoreDetails,
    addressDetails: {} as AddressDetails,
    bankDetails: {} as BankDetails,
    isSubmitting: false,
    error: null,
};

const storeCreationSlice = createSlice({
    name: 'storeCreation',
    initialState,
    reducers: {
        setCurrentStep: (state, action: PayloadAction<number>) => {
            state.currentStep = action.payload;
        },

        setKycDetails: (state, action: PayloadAction<KycDetails>) => {
            state.kycDetails = action.payload;
        },

        setStoreDetails: (state, action: PayloadAction<StoreDetails>) => {
            state.storeDetails = { ...state.storeDetails, ...action.payload };
        },

        setAddressDetails: (state, action: PayloadAction<AddressDetails>) => {
            state.addressDetails = action.payload;
        },

        setBankDetails: (state, action: PayloadAction<BankDetails>) => {
            state.bankDetails = action.payload;
        },

        nextStep: (state) => {
            if (state.currentStep < 4) {
                state.currentStep += 1;
            }
        },

        previousStep: (state) => {
            if (state.currentStep > 1) {
                state.currentStep -= 1;
            }
        },

        setSubmitting: (state, action: PayloadAction<boolean>) => {
            state.isSubmitting = action.payload;
        },

        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },

        resetStoreCreation: () => initialState,
    },
});

export const {
    setCurrentStep,
    setKycDetails,
    setStoreDetails,
    setAddressDetails,
    setBankDetails,
    nextStep,
    previousStep,
    setSubmitting,
    setError,
    resetStoreCreation,
} = storeCreationSlice.actions;

export default storeCreationSlice.reducer;