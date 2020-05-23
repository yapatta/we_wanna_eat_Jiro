export const randomString = (length: number= 12) => {
    // 生成する文字列の長さ
    // 生成する文字列に含める文字セット
    const c = "abcdefghijklmnopqrstuvwxyz0123456789";
    const cl = c.length;
    let r = "";
    for(let i=0; i<length; i++){
        r += c[Math.floor(Math.random()*cl)];
    }
    return r
}