import namedColors from '../Utilities/namedColors.json'

export function colorExistsInNamedColors(color) {
    const namedColorValues = Object.values(namedColors);
    const colorExists = (namedColorValues.indexOf(color) > -1);

    return colorExists;
}
export function getColorName(color) {
    const namedColorKeys = Object.keys(namedColors);
    const namedColorValues = Object.values(namedColors);
    
    const colorIndex = namedColorValues.indexOf(color);
    const colorName = namedColorKeys[colorIndex];

    return colorName;
}