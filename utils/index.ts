export const getErrorMessage = (error: unknown): { message: string } => {
  if (error instanceof Error) {
    return { message: error.message };
  }

  if (typeof error === "string") {
    return { message: error };
  }

  const errorMessage =
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as { data?: { message?: string } }).data?.message === "string"
      ? (error as { data: { message: string } }).data.message
      : "Unable to create company. Please try again.";

  return { message: errorMessage };
};
