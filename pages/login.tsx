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
  const [showBtn, setShowBtn] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const { signIn, signUp, error } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'all' })

  const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
      console.log(error)
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
        {error && <p className="rounded bg-[#e87c03] px-5 py-3">{error}</p>}
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
          <div className="relative flex w-full">
            <label className="w-full">
              <input
                {...register('password', {
                  required: true,
                  minLength: 4,
                  maxLength: 60,
                })}
                type={showPwd ? 'text' : 'password'}
                placeholder="Password"
                className={`input group rounded-r-none ${
                  errors.password && 'border-b-2 border-[#e87c03]'
                }`}
                onBlur={(e) => {
                  console.log(e)
                }}
                onFocus={() => setShowBtn(true)}
              />
            </label>
            <button
              className={
                showBtn
                  ? `absolute right-0 z-10 h-full rounded-r bg-[#454545] pr-3 text-[#8c8c8c]  ${
                      errors.password && 'border-b-2 border-[#e87c03]'
                    }`
                  : 'hidden'
              }
            >
              SHOW
            </button>
          </div>
          {errors.password && (
            <p className="errorMsg !mt-0">
              Your password must contain between 4 and 60 characters.
            </p>
          )}
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
