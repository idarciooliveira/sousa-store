import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type Input = {
    email: string
    password: string
}
export default function Signin() {

    const { register, reset, handleSubmit } = useForm<Input>()

    async function handleOnSubmit({ email, password }: Input) {
        const response = await signIn('credentials', {
            username: email,
            password,
            redirect: false
        })

        if (!response?.ok) return toast.error('Email ou Senha incorrecta', { position: 'top-right' })
        reset()
        return toast.success('Bem-vindo', { position: 'bottom-right' })
    }

    return (
        <div>
            <div className="flex flex-col container mx-auto w-full mt-4 p-6 rounded-md bg-gray-100 text-gray-800">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Sousa Store</h1>
                </div>
                <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-12">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">Email</label>
                            <input required {...register('email')} type="email" name="email" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm">Password</label>
                            </div>
                            <input {...register('password')} type="password" name="password" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-green-600 text-gray-50">
                                Entrar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
