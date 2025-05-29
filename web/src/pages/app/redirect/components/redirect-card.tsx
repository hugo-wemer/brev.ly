import Logo from '@/assets/Logo_Icon.svg'

export function RedirectCard() {
  return (
    <div className="bg-gray-100 px-5 md:px-16 py-12 flex flex-col items-center w-fit rounded-lg gap-6 h-fit">
      <img src={Logo} alt="Brev.ly" className="w-12" />
      <h1 className="font-bold text-2xl/8">Redirecionando...</h1>
      <div className="text-sm/4.5 text-gray-500 flex flex-col items-center text-center gap-1">
        <span>O link será aberto automaticamente em alguns instantes.</span>
        <span>
          Não foi redirecionado?{' '}
          <a href="/" className="text-blue-base font-semibold">
            Acesse aqui
          </a>
        </span>
      </div>
    </div>
  )
}
