
export default async function Page(){
  let data =await fetch (process.env.NEXT_PUBLIC_API_URL+'TestAPI')
  let json =await data.json()
  
  return (JSON.stringify(json))
}
