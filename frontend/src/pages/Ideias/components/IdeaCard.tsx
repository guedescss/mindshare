import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, MessageSquare, ThumbsUp, UserRound } from "lucide-react"
import type { Idea } from "@/types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatRelativeDate } from "@/lib/utils"

interface IdeaCardProps {
  idea: Idea
  onClick: () => void
}

export function IdeaCard({ idea, onClick }: IdeaCardProps) {
  return (
    <Card
      key={idea.id}
      onClick={onClick}
      className="hover:shadow-lg transition-shadow cursor-pointer"
    >
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="bg-zinc-950 text-primary-foreground text-sm">
                {idea.author?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col items-center justify-center gap-1">
              <span className="block text-center text-sm font-medium leading-4 line-clamp-1">
                {idea.author?.name || "Usuário"}
              </span>
              {idea.author?.role && (
                <span
                  className={`inline-flex h-3.5 items-center gap-1 rounded-full px-1.5 text-[10px] font-medium leading-none ${
                    idea.author.role === "owner" || idea.author.role === "admin"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {idea.author.role === "owner" || idea.author.role === "admin" ? (
                    <Crown className="h-2.5 w-2.5" />
                  ) : (
                    <UserRound className="h-2.5 w-2.5" />
                  )}
                  {idea.author.role === "owner"
                    ? "Owner"
                    : idea.author.role === "admin"
                      ? "Admin"
                      : idea.author.role === "viewer"
                        ? "Visualizador"
                        : "Membro"}
                </span>
              )}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="hover:text-primary transition-colors text-xl line-clamp-2 text-zinc-950">
          {idea.title}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {idea.description || ""}
        </p>
        <div className="flex items-center justify-between pt-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground py-1 px-3 border border-zinc-200 rounded-md">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span>{idea.comments?.length || 0}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground py-1 px-3 border border-zinc-200 rounded-md">
              <ThumbsUp className="h-4 w-4 text-green-500" />
              <span>{idea.countVotes || 0}</span>
            </div>
          </div>
          <span className="text-sm text-muted-foreground">
            {formatRelativeDate(idea.createdAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
