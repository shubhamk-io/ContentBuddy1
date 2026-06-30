import { Menu, X } from "lucide-react";
import {useSession} from "../lib/authClient" 


export default function Navbar() {

const {data:session , isPending} = useSession();

const user = session?.user;
const firstName = user?.name?.split("")[0]

  return (
    <nav className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-3 px-4 py-4 sm:px-6 md:px-8 md:py-5">
        <a href="#" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] bg-gradient-to-br from-[#7b3ff1] to-[#387df6] shadow-sm sm:h-9 sm:w-9">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-white sm:h-5 sm:w-5" fill="none" aria-hidden="true">
              <path d="M12 3.75c.55 3.2 1.55 4.18 4.75 4.75-3.2.55-4.2 1.55-4.75 4.75-.55-3.2-1.55-4.2-4.75-4.75 3.2-.57 4.2-1.55 4.75-4.75Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M6.25 12.75c.38 2.18 1.07 2.87 3.25 3.25-2.18.38-2.87 1.07-3.25 3.25C5.87 17.07 5.18 16.38 3 16c2.18-.38 2.87-1.07 3.25-3.25Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M18.3 14.2c.27 1.47.73 1.93 2.2 2.2-1.47.27-1.93.73-2.2 2.2-.27-1.47-.73-1.93-2.2-2.2 1.47-.27 1.93-.73 2.2-2.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-lg font-bold text-[#111827] sm:text-xl">ContentBuddy</span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium text-[#475569] md:flex">
          <a href="#features" className="transition hover:text-[#111827]">Features</a>
          <a href="#how-it-works" className="transition hover:text-[#111827]">How It Works</a>
          <a href="#pricing" className="transition hover:text-[#111827]">Pricing</a>
        </div>

        {/* <div className="flex shrink-0 items-center gap-4 text-sm font-semibold">
          <a href="" className="hidden text-[#334155] transition hover:text-[#111827] sm:block">Login</a>
          <a href="" className="rounded-full bg-gradient-to-r from-[#743cf1] to-[#367df5] px-3.5 py-2 text-xs font-bold text-white shadow-[0_6px_14px_rgba(67,91,229,0.22)] transition hover:-translate-y-0.5 sm:px-5 sm:py-2.5 sm:text-sm">
              <span className="hidden min-[390px]:inline">Get Started Free</span>
              <span className="min-[390px]:hidden">Start</span>
            </a>
          </div> */}


        <div className="flex items-center gap-3">

          <div className="relative md:block hidden group">
            <button className="rounded-full bg-white px-4 py-2 shadow font-bold hover:bg-gray-50">{firstName}</button>

            <div className="absolute right-0 mt-2 hidden w-48 rounded-xl border bg-[#713EF1] shadow-xl group-hover:block">
              <a href=""></a>
            </div>

          </div>

        </div>
      </div>
    </nav>
  )
}