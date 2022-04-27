import Head from 'next/head'
import Image from 'next/image'

const Login = () => {
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />

      <form className="relative mt-24 space-y-8 rounded bg-black/50 py-10 px-8 md:mt-0 md:max-w-md md:px-14">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <div className="flex flex-col items-center space-y-4">
          <label className="w-full">
            <input type="email" placeholder="Email" className="input" />
          </label>
          <label className="w-full">
            <input type="password" placeholder="Password" className="input" />
          </label>
        </div>

        <button className="w-full rounded bg-red-600 py-2">Sign In</button>
      </form>
    </div>
  )
}

export default Login
