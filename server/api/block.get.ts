// server/api/block.get.ts
export default () => {
    let c = 0
    while (true) {
        const a = 2+ 2
        const b = a + Math.random()
        c += b
        setTimeout(() => {
            c = 0
        })
    }
}