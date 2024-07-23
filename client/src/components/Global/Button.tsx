
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text:string,
  variant : 'small'|'medium'|'large'
}


export default function Button({text,variant,...rest}:Props){
  return (
    <button {...rest} className={` ${variant==='small'?'w-24': variant==='medium' ? 'w-40': 'w-80'} py-2  rounded-full text-white font-light transition duration-200 ease-linear shadow-[0_4px_14px_0_rgba(20,184,166,0.39)] hover:shadow-[0_6px_20px_rgba(20,184,166,0.23)] hover:bg-[rgba(20,184,166,0.9)] bg-teal`}>
        {text}
      </button>

  )
}
