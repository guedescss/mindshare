import type { RegisterInput, User } from "@/types"
import { create } from "zustand"
import { apolloClient } from "@/lib/apollo"
import { persist } from "zustand/middleware"
import { REGISTER } from '@/lib/graphql/mutations/Register'

type RegisterMutationData = {
    register: {
        token: string
        refreshToken: string
        user: User
    }
}

interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    signup: (data: RegisterInput) =>Promise<boolean>
}

export const useAuthStore = create<AuthState>() (
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            signup: async (registerData: RegisterInput) => {
                 try{
                    const { data } = await apolloClient.mutate<
                    RegisterMutationData,
                    {data: RegisterInput}
                    >({
                        mutation: REGISTER,
                        variables: {
                            data: {
                                name: registerData.name,
                                email: registerData.email,
                                password: registerData.password
                            }
                        }
                    })
                    if(data?.register){
                        const { token, user } = data.register

                        set({
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                role: user.role,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt
                            },
                            token,
                            isAuthenticated: true
                        })
                    }
                }catch(error){
                    console.log("Erro ao fazer o login")
                    throw error
                }
                return false
            }
               
        }),
        {
            name: 'auth-storage'
        }
    )
)