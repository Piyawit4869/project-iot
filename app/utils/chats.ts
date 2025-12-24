export const handleSplitThaiAddress = (address: string) => {
  const keywords = ["แขวง", "ตำบล", "เขต", "อำเภอ"];

  for (const keyword of keywords) {
    const regex = new RegExp(`,\\s*${keyword}`);
    const match = address.search(regex);

    if (match !== -1) {
      return {
        line1: address.slice(0, match).trim(),
        line2: address.slice(match + 2).trim(),
      };
    }
  }

  const parts = address.split(",").map((p) => p.trim());
  return {
    line1: parts.slice(0, 2).join(", "),
    line2: parts.slice(2).join(", "),
  };
};
