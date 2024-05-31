const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

const generateBoardUrl = (length = 8) => {
    const out: string[] = [];
    for (let i = 0; i < length; i ++) {
        out.push(chars[Math.floor(Math.random() * chars.length)]);
    }
    return out.join("");
}

export default generateBoardUrl