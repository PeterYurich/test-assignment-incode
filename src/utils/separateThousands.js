export default function separateThousands(number) {
    const str = String(number)
    const arr = str.split('')
    const reversedArr = arr.reverse()
    const reversedArrWithCommas = reversedArr.map((num, index) => {
        if (index % 3 === 0 && index !== 0 ) {
            return `${num}'`
        }
        return num
    })
    const rightOrderArrWithCommas = reversedArrWithCommas.reverse()
    return rightOrderArrWithCommas.join('')
}