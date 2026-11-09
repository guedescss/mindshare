import { useState } from "react";
import logo from "@/assets/logo.svg"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = () => {

    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6">
            <img src={logo} className="w-64 h-22" />   
        <Card className="w-full max-w-xl rounded-xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    Acesse a plataforma
                </CardTitle>
                <CardDescription>
                    Entre usando seu e-mail e senha cadastrados
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor='email'>Email</Label>
                       <Input
                            className="h-11 rounded-md border-input bg-background"
                            id='email'
                            type='email'
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor='password'>Password</Label>
                       <Input
                            className="h-11 rounded-md border-input bg-background"
                            id='password'
                            type='password'
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                    </div>
                    <Button type="submit" className="h-11 w-full rounded-md cursor-pointer">Entrar</Button>
                </form>
            </CardContent>
        </Card>

        <Card className="w-full max-w-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Ainda não tem uma conta?
          </CardTitle>
          <CardDescription>Cadastre-se agora mesmo</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="h-11 w-full rounded-md" asChild>
            <Link to="/signup"> Criar conta </Link>
          </Button>
        </CardContent>
      </Card>
        </div>
    )

}