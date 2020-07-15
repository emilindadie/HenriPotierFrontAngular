export interface SecureApiResponse<T> {
  data: T;
  error: string;
  accessToken: string;
}
