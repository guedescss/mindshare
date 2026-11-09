import { useState } from "react"
import logo from "@/assets/logo.svg"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useAuthStore } from "@/stores/auth"
import { toast } from "sonner"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const login = useAuthStore((state) => state.login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const loginMutate = await login({
        email,
        password,
      })
      if (loginMutate) {
        toast.success("Login realizado com sucesso!")
      }
    } catch {
      toast.error("Falha ao realizar o login!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center gap-8">
      <img src={logo} className="h-auto w-80" />
      <Card className="w-full max-w-lg rounded-xl">
        <CardHeader className="p-8">
          <CardTitle className="text-3xl font-bold">
            Acesse a plataforma
          </CardTitle>
          <CardDescription className="text-base">
            Entre usando seu e-mail e senha cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-base">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="h-11"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-base">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                className="h-11"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="h-11 w-full text-base" disabled={loading}>
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="w-full max-w-lg rounded-xl">
        <CardHeader className="p-8">
          <CardTitle className="text-2xl font-bold">
            Ainda não tem uma conta?
          </CardTitle>
          <CardDescription className="text-base">Cadastre-se agora mesmo</CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-5 pt-0">
          <Button variant="outline" className="h-11 w-full text-base" asChild>
            <Link to="/signup"> Criar conta </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
