
export const getData = async () => {
  const data = await fetch('https://mate-academy.github.io/phone-catalogue-static/api/phones.json')
  const mobiles = await data.json()

  const result = mobiles.map(mobile => {
    return {...mobile, price: +(Math.random() * 1000).toFixed(2)}
  })

  return result;
}