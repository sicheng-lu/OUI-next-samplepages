/**
 * Lightweight OuiIcon implementation compatible with @opensearch-project/oui v9-rework.
 * Uses the same icon component cache pattern as the full OUI library.
 */
import { type ComponentType, type SVGAttributes } from 'react';

export type IconSize = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'original';
export type IconColor = string;
export type IconType = string | ComponentType;

let iconComponentCache: Record<string, ComponentType> = {};

export const appendIconComponentCache = (map: Record<string, ComponentType>) => {
  Object.assign(iconComponentCache, map);
};

export const clearIconComponentCache = (iconType?: string) => {
  if (iconType != null) {
    delete iconComponentCache[iconType];
  } else {
    iconComponentCache = {};
  }
};

const sizeMap: Record<string, number | undefined> = {
  s: 12,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};

export interface OuiIconProps extends Omit<SVGAttributes<SVGElement>, 'type' | 'color' | 'size'> {
  type: IconType;
  size?: IconSize;
  color?: IconColor;
  title?: string;
  titleId?: string;
  className?: string;
}

export const OuiIcon = ({ type, size = 'm', color, className, title, ...rest }: OuiIconProps) => {
  const Svg = typeof type === 'string' ? iconComponentCache[type] : type;

  if (!Svg) {
    return null;
  }

  const dim = sizeMap[size];
  const style = color ? { color, fill: color } : undefined;

  return (
    <Svg
      className={className}
      style={style}
      width={dim}
      height={dim}
      role="img"
      aria-hidden={!title}
      title={title}
      {...(rest as any)}
    />
  );
};

export const TYPES: string[] = [];
export const SIZES: IconSize[] = ['s', 'm', 'l', 'xl', 'xxl', 'original'];
export const COLORS: string[] = [];
