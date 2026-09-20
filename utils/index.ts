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

export default function getFormattedWord(
  text: string,
  splitter?: string,
  caseType?: "uppercase" | "lowercase" | "capitalize",
): string {
  if (!text) return "N/A";
  const arr = text.split(splitter || " ");
  if (caseType === "uppercase") return arr.join("").toUpperCase();
  if (caseType === "lowercase") return arr.join("").toLowerCase();
  return arr.map((t) => t.slice(0, 1).toUpperCase() + t.slice(1).toLowerCase()).join(" ");
}