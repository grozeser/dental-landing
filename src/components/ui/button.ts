// Class strings, not a component: the same look is used on <a>, <button> and next/link.
const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

export const button = {
  primary: `${base} bg-teal-700 text-white hover:bg-teal-800`,
  secondary: `${base} border border-teal-700/25 bg-white text-teal-800 hover:bg-teal-50`,
};
