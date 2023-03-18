import { InjectionToken } from '@angular/core';

export const CORE_COLOR_PALETTES = new InjectionToken<Array<string>>(
  'core.color.palettes'
);

const colorPalettes = [
  '#3366CC',
  '#DC3912',
  '#FF9900',
  '#109618',
  '#990099',
  '#3B3EAC',
  '#0099C6',
  '#DD4477',
  '#66AA00',
  '#B82E2E',
  '#316395',
  '#994499',
  '#22AA99',
  '#AAAA11',
  '#6633CC',
  '#E67300',
  '#8B0707',
  '#329262',
  '#5574A6',
  '#3B3EAC'
];

export const CoreColorPalettesProvider = {
  provide: CORE_COLOR_PALETTES,
  useValue: colorPalettes
};
