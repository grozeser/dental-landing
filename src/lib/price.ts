const rub = new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 });

export const formatRub = (n: number) => rub.format(n);

type PriceItem = { id: string; price: number };

/** selection: item id → quantity; 0 or missing means "not selected". */
export function calcTotal(list: PriceItem[], selection: Record<string, number>) {
  return list.reduce((sum, item) => sum + item.price * Math.max(0, selection[item.id] ?? 0), 0);
}

/** Monthly payment for an interest-free installment, rounded up to whole roubles. */
export const monthly = (total: number, months = 12) => Math.ceil(total / months);
