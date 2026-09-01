const getErrorMessage = (error: Error): { message: string } => {
  if (error instanceof Error) {
    return { message: error.message };
  }

  const errorMessage =
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as { data?: { message?: string } }).data?.message === "string"
      ? (error as { data: { message: string } }).data.message
      : "";
  return { message: errorMessage };
};
