import debug from "debug";

export const getLogger = (path: string[]) => debug(`app:${path.join(':')}`)
