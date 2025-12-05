import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="content-wrapper flex flex-col items-center justify-center py-20 fade-in">



      <Link href="/">
        <div className="mb-12 opacity-0 animate-[fadeIn_1.4s_ease_forwards] cursor-pointer">
          <Image
            src="/logo.png"
            alt="DeathPost Logo"
            width={190}
            height={190}
            priority
            className="animate-[float_4s_ease-in-out_infinite]"
          />
        </div>
      </Link>

      <main className="w-full max-w-2xl">

        {/* Ritual Warning Box */}
        <div className="inner-box px-12 py-16 text-center opacity-0 animate-[fadeIn_1.8s_ease_forwards] hover:shadow-[0_0_25px_rgba(255,0,0,0.25)] transition-shadow duration-500">

          <h1 className="death-title text-4xl mb-8 tracking-wide">
            Debt Oath
          </h1>

          <p className="text-lg leading-relaxed opacity-90 mb-12">
            You now stand before a notebook that binds obligation to fate.
            Every entry you create shapes a story of dues, promises, and consequences.
            <br /><br />
            Every rewrite alters the path of another.
            <br></br>
            Every erasure seals a chapter forever.
            <br></br>

            Only those who acknowledge this oath, and understand that this
            system exists purely for <span className="underline">entertainment and learning</span>,
            may proceed beyond this point.
            <br /><br />
            <span className="death-title text-2xl">YOU HAVE BEEN WARNED.</span>
          </p>

          <Link
            href="/register"
            className="death-btn text-xl px-12 py-3 inline-block opacity-0 animate-[fadeIn_2.2s_ease_forwards]"
          >
            Continue
          </Link>
        </div>
      </main>
    </div>
  );
}