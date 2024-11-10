

export function successResponse<T>({
  message = 'success',
  data,
}: {
  message?: string;
  data: T;
}) {
  let ans: { status: number; message: string; data: T } = {
    status: 200,
    message: message,
    data: data,
  };
  return ans;
}

export function errorResponse({ message = 'failed' }: { message: string }) {
  let ans: { status: number; message: string } = {
    status: 400,
    message: message,
  };
  return ans;
}
