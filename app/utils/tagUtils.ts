export const DEFAULT_TAGS = [
  "NoInfo",
  "ดอนชำ",
  "D3MEETING",
  "MEETING2024",
  "Y2025",
  "OGGA",
  "ORDER2025",
  "CNY2025",
  "B2B-Direct",
  "WarmLead",
  "Eco",
  "FollowUp2025",
  "Engaged2024",
  "ORDERED",
  "NY2024-Potential",
  "GiftSet",
  "Health-Hospital",
  "ColdLead",
  "ONETIME",
  "Engaged2023",
  "Moved-Pending",
  "ASIASAMPLE",
  "D4GOT",
  "NEW2025",
  "YFFOLLOW",
  "Oops2025",
  "A2NT",
  "YFMEETING",
  "SHOWDAY25",
  "QT25",
  "2025",
  "LOST2025",
  "JUNE2026",
  "AGENCY",
  "A5Got",
  "A4Thurs",
  "MEETING2025",
  "feedback",
  "SIA",
  "odoo",
  "QT",
  "A3GARFEILD",
  "D5+A2",
  "JUNE",
  "D2PEW",
  "Kohchang",
  "Moved-2024",
  "CustomMade",
  "Silent",
  "ReEngage",
  "PARTNER",
  "TRASHEX",
  "EcoFocus",
  "Inactive",
  "SampleLost2024",
  "HotLead",
  "Upsell2025",
  "NY2024-Greet",
  "FollowUp",
  "Gifts",
  "survey",
  "VIP",
  "NGO",
  "AmazingGreenFest2024",
  "Kohtao",
  "Y2022",
  "Oops2024-2",
  "Oops2024-1",
  "USER1",
  "MUT2024",
  "EventMerch",
];

export function addTag(tags: string[], newTag: string): string[] {
  if (!tags.includes(newTag) && newTag.trim()) {
    return [...tags, newTag];
  }
  return tags;
}

export function removeTag(tags: string[], tagToRemove: string): string[] {
  return tags.filter((tag) => tag !== tagToRemove);
}

export function isValidTag(tag: string): boolean {
  return tag.trim().length > 0 && tag.trim().length <= 50;
}

export function sortTags(tags: string[]): string[] {
  return [...tags].sort((a, b) => a.localeCompare(b));
}

export function filterTags(tags: string[], query: string): string[] {
  const lowerQuery = query.toLowerCase();
  return tags.filter((tag) => tag.toLowerCase().includes(lowerQuery));
}
