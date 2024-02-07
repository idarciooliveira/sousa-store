import { UserProps, createUser } from '@/services/api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function Signin() {

    const router = useRouter()
    const { register, reset, handleSubmit } = useForm<UserProps>()

    async function handleOnSubmit(values: UserProps) {
        const user = await createUser(values)

        if (!user) {
            return toast.error('Ocorreu um erro', { position: 'top-right' })
        } else {
            reset()
            toast.success('Registrado', { position: 'top-right' })
            router.push('/auth/signin')
        }


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
                            <label htmlFor="name" className="block mb-2 text-sm">Nome</label>
                            <input required {...register('name')} type="name" name="name" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="block mb-2 text-sm">Telefone</label>
                            <input required {...register('phoneNumber')} type="number" name="phoneNumber" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                        </div>
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
                    <div className="space-x-2 flex flex-row items-center justify-center">
                        <div>
                            <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-green-600 text-gray-50">
                                Criar Conta
                            </button>
                        </div>
                        <div>
                            <Link href={'/auth/signin'} className="w-full px-8 py-3 font-semibold bg-blue-600 rounded-md bg-green-600 text-gray-50">
                                Ja tenho uma conta
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
