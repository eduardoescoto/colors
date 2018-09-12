import namedColors from '../Utilities/namedColors.json'
import { SETTINGS_MODE } from '../Actions/colorSettingsChangeAction';

// NAMED COLOR METHODS
export function colorExistsInNamedColors(color) {
    const namedColorValues = Object.values(namedColors);
    const colorExists = (namedColorValues.indexOf(color) > -1);

    return colorExists;
}
export function getColorName(color) {
    let colorName;

    if (colorExistsInNamedColors(color)) {
        const namedColorKeys = Object.keys(namedColors);
        const namedColorValues = Object.values(namedColors);

        const colorIndex = namedColorValues.indexOf(color);
        colorName = namedColorKeys[colorIndex];

    } else {
        colorName = `${color} is not an x11 named color :(`
    }

    return colorName;
}

//COLOR METHODS
export function getColorInfo(color) {
    const colorInfo = {
        name: getColorName(color),
        hex: toHex(color),
        hsl: toHSL(color),
        rgb: toRGB(color),
        // tags: getTags(color)
    }

    return colorInfo;
}
export function toHex({ type, color }) {
    let hex;

    switch (type) {
        case SETTINGS_MODE.HEX: hex = color; break;
        case SETTINGS_MODE.HSL: hex = toHexFromHSL(color); break;
        case SETTINGS_MODE.RGB: hex = toHexFromRGB(color); break;
        default: hex = undefined; break;
    }

    return hex;
}
function toHexFromHSL({ hue, saturation, lightness }) {

}
function toHexFromRGB({ red, green, blue }) {
    function getHexString(value) {
        return String(value.toString(16)).toUpperCase();
    }
    const hex = {
        red: getHexString(red),
        green: getHexString(green),
        blue: getHexString(blue),
        toString: () => {
            const { red, green, blue } = this;
            const string = `#${red}${green}${blue}`;
            return string;
        }
    }

    return hex;
}
function RGBObjectFactory(color) {
    const rgb = {
        ...color,
        toString: () => {
            const { red, green, blue } = this;
            const string = `(${red}, ${green}, ${blue})`;
            return string;
        }
    }

    return rgb;
}
function HexObjectFactory(color) {

}
function toRGBFomHex({ red, green, blue }) {
    function getIntFromHex(value) {
        return Number.parseInt(value, 16);
    }
    const rgbInts = {
        red: getIntFromHex(red),
        green: getIntFromHex(green),
        blue: getIntFromHex(blue)
    }
    const rgb = RGBObjectFactory(rgbInts);

    return rgb;
}
function rgbToHSL({ hue, saturation, lightness }) {
    let red, green, blue;

    if (saturation == 0) {
        red = green = blue = lightness; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3) * 255;
        g = hue2rgb(p, q, h) * 255;
        b = hue2rgb(p, q, h - 1 / 3) * 255;
    }

    return;
}
export function toHSL(color) {

}
export function toRGB(color) {

}
export function getTags(color) {

}