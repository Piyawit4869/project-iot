export const generateOrganizationCode = (id: string, code?: string) => {
  if (code && code.trim()) {
    return String(code);
  }
  const numericId = parseInt(id, 10);
  if (!isNaN(numericId)) {
    return `ORG-${numericId.toString().padStart(3, "0")}`;
  }
  return "ORG-001";
};
