import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/auth"
import logoIcon from "@/assets/logo-icon.svg"
import { Button } from "./ui/button"
import { Lightbulb, LogOut, Users } from "lucide-react"
import { Avatar, AvatarFallback } from "./ui/avatar"

export function Header() {
  const { user, logout, isAuthenticated } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()
  const isIdeasPage = location.pathname === "/"
  const isMembersPage = location.pathname === "/members"

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="w-full px-5 pt-4">
      {isAuthenticated && (
        <div className="flex justify-between w-full">
          <div className="min-w-48">
            <img src={logoIcon} className="h-10 w-10" />
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button
                size="default"
                className="gap-2"
                variant={isIdeasPage ? "default" : "ghost"}
              >
                <Lightbulb className="h-4 w-4" />
                Ideias
              </Button>
            </Link>
            <Link to="/members">
              <Button
                size="default"
                className="gap-2"
                variant={isMembersPage ? "default" : "ghost"}
              >
                <Users className="h-4 w-4" />
                Membros
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
                <Avatar className="h-12 w-12">
                <AvatarFallback className="items-center justify-center bg-zinc-950 text-center leading-none text-primary-foreground">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.name}</span>
                <span className="text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
