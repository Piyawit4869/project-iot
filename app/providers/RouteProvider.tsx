"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

export type Segment = {
  href: string;
  label: React.ReactNode | string;
  uuid: string;
};

export type Crumb = {
  feature: string;
  segments: Segment[];
};

type RouteContextType = {
  crumbs: Crumb;
  setCrumbs: React.Dispatch<React.SetStateAction<Crumb>>;
};

type UseEntityBreadcrumbType = {
  feature: string;
  entity: any;
  base: Segment;
};

const STORAGE_KEY = "breadcrumbs_state";

const RouteContext = createContext<RouteContextType | null>(null);

export function RouteProvider({ children }: { children: React.ReactNode }) {
  const [crumbs, setCrumbs] = useState<Crumb>({
    feature: "",
    segments: [],
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: Crumb = JSON.parse(saved);
        setCrumbs(parsed);
      } catch (err) {
        console.error("Failed to parse saved crumbs:", err);
      }
    }
  }, []);

  const value = useMemo(() => ({ crumbs, setCrumbs }), [crumbs]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(crumbs));
  }, [crumbs]);

  return (
    <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
  );
}

export function useRoute() {
  const ctx = useContext(RouteContext);
  if (!ctx) throw new Error("useRoute must be used within RouteProvider");
  return ctx;
}

export const useEntityBreadcrumb = ({
  feature,
  entity,
  base,
}: UseEntityBreadcrumbType) => {
  const { setCrumbs } = useRoute();

  useEffect(() => {
    if (!entity || !base) return;

    setCrumbs((prev) => {
      const newSeg = {
        href: base.href,
        label: base.label,
        uuid: base.uuid,
      };

      const exists = prev.segments.some((s) => s.uuid === newSeg.uuid);

      if (prev.feature === feature && !exists) {
        return {
          ...prev,
          segments: [...prev.segments, newSeg],
        };
      } else if (prev.feature !== feature) {
        return {
          feature,
          segments: [newSeg],
        };
      } else {
        return prev;
      }
    });
  }, [feature, entity?.id, base?.uuid, base?.href, base?.label, setCrumbs]);
};
