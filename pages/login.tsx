import Head from 'next/head'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Loader from '../components/Loader'
import useAuth from '../hooks/useAuth'

interface FormData {
  email: string
  password: string
}

const Login = () => {
  const [login, setLogin] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const pwdInput = useRef<HTMLInputElement | null>(null)

  const load = true
  const { signIn, signUp, error, loading } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'all' })
  const { ref, ...rest } = register('password', {
    required: true,
    minLength: 4,
    maxLength: 60,
  })

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
        className="relative mt-24 space-y-8 rounded bg-black/80 py-10 px-8 md:mt-0 md:w-[448px] md:max-w-md md:px-16"
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
              autoFocus={false}
              placeholder="Email"
              className={`input ${
                errors.email && 'border-b-2 border-[#e87c03]'
              }`}
            />
            {errors.email && (
              <p className="errorMsg">Please enter a valid email</p>
            )}
          </label>
          <div
            className="flex w-full flex-col focus:bg-[#454545]"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setShowBtn(false)
                setShowPwd(false)
              }
            }}
          >
            <label className="flex w-full">
              <input
                {...rest}
                name="password"
                ref={(e) => {
                  ref(e)
                  pwdInput.current = e
                }}
                type={showPwd ? 'text' : 'password'}
                placeholder="Password"
                className={`input rounded-r-none ${
                  errors.password && 'border-b-2 border-[#e87c03]'
                }`}
                onFocus={() => setShowBtn(true)}
              />

              <button
                onClick={(e) => {
                  e.preventDefault()
                  setShowPwd(!showPwd)
                  if (pwdInput.current) {
                    pwdInput.current.focus()
                  }
                }}
                className={
                  showBtn
                    ? `rounded-r bg-[#454545] pr-3 text-[#8c8c8c]  ${
                        errors.password && 'border-b-2 border-[#e87c03]'
                      }`
                    : 'hidden'
                }
              >
                {showPwd ? 'HIDE' : 'SHOW'}
              </button>
            </label>
            {errors.password && (
              <p className="errorMsg">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full rounded bg-red-600 py-2 font-bold"
          onClick={() => setLogin(true)}
        >
          {loading ? <Loader color="dark:fill-[#454545]" /> : 'Sign in'}
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
