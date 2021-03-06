import tinyColor from 'tinycolor2';

const getCorrectIndex = number => number > 255 ? 255 : number < 0 ? 0 : number;

export default hash => {
    const [r, g, b] = hash.substr(3, 6).split('').map(item => getCorrectIndex(item.charCodeAt(0)));

    return {
        color: tinyColor({r, g, b})
            .lighten(10)
            .saturate(10)
            .toHexString(),
        colorLighten: tinyColor({r, g, b})
            .lighten(30)
            .saturate(30)
            .toHexString()
    };
};