export interface Debt {
  id: number;
  name: string;
  location: string | null;
  amount: number | null;
  dueDate: string | null;
  notes: string | null;
  createdAt: string;
}