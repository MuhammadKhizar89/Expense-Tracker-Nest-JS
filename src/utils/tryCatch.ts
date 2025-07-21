import { HttpException, HttpStatus } from "@nestjs/common";
export default async function tryCatch<T>(fn: () => Promise<T>) {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof HttpException) {
      throw new HttpException(
        { success: false, message: error.message || 'An error occurred' },
        error.getStatus()
      );
    }
    throw new HttpException(
      { success: false, message: 'An unexpected error occurred' },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
