export type SuccessPayload<T> = {
  status: number;
  message: string;
  data: T;
};

export type ErrorPayload = {
  status: number;
  message: string;
};
