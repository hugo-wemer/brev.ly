import { MyLinks } from './components/my-links'
import { NewLinkForm } from './components/new-link-form'
import '@/global.css'
import Logo from '@/assets/Logo.svg'

export function Home() {
  return (
    <main className="md:h-dvh flex flex-col items-center justify-center mt-8 md:w-fit mx-auto w-screen">
      <div className="md:w-full mb-3 md:mb-8">
        <img src={Logo} alt="Brev.ly" className="w-24" />
      </div>
      <div className="flex flex-col gap-3 md:flex-row h-2/3">
        <NewLinkForm />
        <MyLinks />
      </div>
    </main>
  )
}
