import { Page } from "../../components/Page"
import { Button } from "../../components/ui/button"
import { Label } from "../../components/ui/label"
import { Lightbulb, MessageSquare, Plus, ThumbsUp } from "lucide-react"
import { CreateIdeaDialog } from "./components/CreateIdeaDialog"
import { useEffect, useState } from "react"
import { useQuery } from "@apollo/client/react"
import { LIST_IDEAS } from "../../lib/graphql/queries/Ideia"
import { Idea } from "../../types"
import { IdeaCard } from "./components/IdeaCard"
import { IdeaDetailDrawer } from "./components/IdeaDetailDrawer"
import { toast } from "sonner"

export function IdeasPage() {
  const [openDialog, setOpenDialog] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const { data, loading, error, refetch } =
    useQuery<{ listIdeas: Idea[] }>(LIST_IDEAS)
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null)

  useEffect(() => {
    if (error) toast.error(error.message)
  }, [error])

  const ideas = data?.listIdeas || []
  const commentCount = ideas.reduce(
    (total, idea) => total + (idea.comments?.length ?? 0),
    0
  )
  const voteCount = ideas.reduce(
    (total, idea) => total + (idea.votes?.length ?? 0),
    0
  )
  const selectedIdea = ideas.find((idea) => idea.id === selectedIdeaId)

  const handleIdeaClick = (ideaId: string) => {
    setSelectedIdeaId(ideaId)
    setOpenDrawer(true)
  }

  return (
    <Page>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label className="mb-1 block text-3xl font-medium text-purple-600">
              Ideias
            </Label>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-200 px-2 py-0.5 text-xs text-purple-900">
                <Lightbulb className="h-3.5 w-3.5" />
                <span className="font-bold">{ideas.length}</span>{" "}
                {ideas.length === 1 ? "ideia" : "ideias"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-200 px-2 py-0.5 text-xs text-indigo-900">
                <MessageSquare className="h-3.5 w-3.5" />
                <span className="font-bold">{commentCount}</span>{" "}
                {commentCount === 1 ? "comentário" : "comentários"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-green-200 px-2 py-0.5 text-xs text-green-900">
                <ThumbsUp className="h-3.5 w-3.5" />
                <span className="font-bold">{voteCount}</span>{" "}
                {voteCount === 1 ? "voto" : "votos"}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mx-4 h-8 w-px bg-gray-300" />
            <Button onClick={() => setOpenDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nova ideia
            </Button>
          </div>
        </div>
      </div>
      <div className="grid gap-4 pt-6 md:grid-cols-2 lg:grid-cols-4">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`idea-skeleton-${i}`}
              className="h-32 rounded-lg border border-dashed border-muted-foreground/30"
            />
          ))}
        {!loading && ideas.map((idea) => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            onClick={() => handleIdeaClick(idea.id)}
          />
        ))}
      </div>
      <IdeaDetailDrawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        idea={selectedIdea}
        loading={loading}
      />
      <CreateIdeaDialog open={openDialog} onOpenChange={setOpenDialog} onCreated={() => refetch()} />
    </Page>
  )
}
