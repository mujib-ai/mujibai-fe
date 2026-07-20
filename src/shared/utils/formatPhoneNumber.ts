import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function formatPhoneNumber(phone: string): string {
  const parsed = parsePhoneNumberFromString(phone);
  return parsed?.isValid() ? parsed.formatInternational() : phone;
}
