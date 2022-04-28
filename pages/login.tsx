import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../hooks/useAuth'

interface FormData {
  email: string
  password: string
}

const Login = () => {
  const [login, setLogin] = useState(false)
  const { signIn, signUp } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }

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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/50 py-10 px-8 md:mt-0 md:max-w-md md:px-16"
      >
        <h1 className="text-3xl font-bold">Sign In</h1>
        <div className="flex flex-col items-center space-y-4">
          <label className="w-full">
            <input
              {...register('email', {
                required: true,
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              })}
              type="email"
              placeholder="Email"
              className={`input ${
                errors.email && 'border-b-2 border-[#e87c03]'
              }`}
            />
            {errors.email && (
              <p className="errorMsg">Please enter a valid email</p>
            )}
          </label>
          <label className="bor w-full">
            <input
              {...register('password', {
                required: true,
                minLength: 4,
                maxLength: 60,
              })}
              type="password"
              placeholder="Password"
              className={`input ${
                errors.password && 'border-b-2 border-[#e87c03]'
              }`}
            />
            {errors.password && (
              <p className="errorMsg">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-red-600 py-2 font-bold"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>

        <div className="text-base text-[#8c8c8c]">
          New to Netflix?
          <button
            className="pl-2 text-white hover:underline"
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
