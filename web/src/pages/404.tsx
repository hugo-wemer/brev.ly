import Logo from '@/assets/404.svg'

export function NotFound() {
  return (
    <div className="px-3 h-dvh flex justify-center items-center">
      <div className="bg-gray-100 px-5 md:px-16 py-12 flex flex-col items-center w-[366px] md:w-[580px] rounded-lg gap-6 h-fit">
        <img src={Logo} alt="Brev.ly" className="h-[85px]" />
        <h1 className="font-bold text-2xl/8">Link não encontrado</h1>
        <div className="text-sm/4.5 text-gray-500 flex flex-col items-center text-center gap-1">
          <span>
            O link que você está tentando acessar não existe, foi removido ou é
            uma URL inválida. Saiba mais em{' '}
            <a href="/" className="text-blue-base font-semibold">
              brev.ly
            </a>
            .
          </span>
        </div>
      </div>
    </div>
  )
}
