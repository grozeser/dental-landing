// Formats any input as "+7 (999) 123-45-67". Separators only appear before a typed digit,
// so Backspace at the end always removes a digit instead of getting stuck on ")" or "-".
export function maskPhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  // Drop the country code: "+7…" from our own format, or a leading 7/8 typed/pasted by the user.
  // A 10-digit number starting with 8 is a local one (e.g. 812 — St. Petersburg), keep it.
  if (raw.trim().startsWith("+7") || (/^[78]/.test(d) && d.length !== 10)) d = d.slice(1);
  d = d.slice(0, 10);
  if (!d) return "";

  let out = `+7 (${d.slice(0, 3)}`;
  if (d.length > 3) out += `) ${d.slice(3, 6)}`;
  if (d.length > 6) out += `-${d.slice(6, 8)}`;
  if (d.length > 8) out += `-${d.slice(8, 10)}`;
  return out;
}

export const isFullPhone = (v: string) => /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(v);
