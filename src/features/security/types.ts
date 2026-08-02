export interface TwoFactorSetupResponse {
  qrCode: string;
  manualEntryKey: string;
}

export interface VerifyTwoFactorPayload {
  code: string;
}

export interface VerifyTwoFactorResponse {
  isTwoFactorEnabled: boolean;
}

export interface DisableTwoFactorPayload {
  code: string;
}
