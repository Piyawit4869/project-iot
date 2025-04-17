import {
  ZodTypeAny,
  ZodObject,
  ZodOptional,
  ZodDefault,
  ZodEffects,
} from "zod";

type ZodShape = Record<string, ZodTypeAny>;

export function getRequiredPaths(schema: ZodTypeAny, basePath = ""): string[] {
  const paths: string[] = [];

  const unwrap = (type: ZodTypeAny): ZodTypeAny => {
    if (type instanceof ZodOptional) {
      const inner = type._def.innerType;
      return inner ? unwrap(inner) : type;
    }
    if (type instanceof ZodDefault) {
      const inner = type._def.innerType;
      return inner ? unwrap(inner) : type;
    }
    if (type instanceof ZodEffects) {
      const inner = type._def.schema;
      return inner ? unwrap(inner) : type;
    }
    return type;
  };

  if (schema instanceof ZodObject) {
    const shape = schema._def.shape() as ZodShape;

    for (const key in shape) {
      const field = shape[key];
      const fullPath = basePath ? `${basePath}.${key}` : key;

      const isOptional =
        field instanceof ZodOptional || field instanceof ZodDefault;
      if (!isOptional) {
        paths.push(fullPath);
      }

      const unwrapped = unwrap(field as any);
      if (unwrapped instanceof ZodObject) {
        paths.push(...getRequiredPaths(unwrapped, fullPath));
      }
    }
  }

  return paths;
}
