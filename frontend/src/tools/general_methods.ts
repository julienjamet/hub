/**
 * [ CONTROL HOVER ] METHOD
 * @param { boolean | undefined } isHovered
 * @returns { string }
**/
export const controlHover = (isHovered: boolean | undefined): string => {
    return isHovered ? 'hovered' : isHovered === false ? 'notHovered' : '';
};