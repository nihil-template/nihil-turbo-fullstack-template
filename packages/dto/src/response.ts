export type SuccessPayload<T> = {
  status: number;
  data: T;
};

export type ErrorPayload = {
  status: number;
  message: string;
};
