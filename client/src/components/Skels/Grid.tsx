

const nums =[1,2,3,4,5,6]

export default function Grid() {
  return (
    <div className='grid grid-cols-1 mt-8 md:grid-cols-2 xl:grid-cols-3 gap-4 w-max mx-auto'>
        {nums.map((item)=>(

      <div key={item} className="bg-black w-96 h-64  rounded-md overflow-hidden border border-white animate-pulse" ></div>
        ))}
    </div>
  )
}
