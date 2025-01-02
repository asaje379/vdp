export type WithId<T> = T & { id: string };
export type List<T> = WithId<T>[];
export type CountedList<T> = { count: number; values: List<T> };
export type UpdateOrDeleteFn<T> = (row: WithId<T>) => void;
