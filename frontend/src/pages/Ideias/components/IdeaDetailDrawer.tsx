import { Drawer, DrawerContentRight } from "../../../components/ui/drawer"
import { useMutation } from "@apollo/client/react"
import { LIST_IDEAS } from "../../../lib/graphql/queries/Ideia"
import { useState } from "react"
import { Idea } from "../../../types"
import { Button } from "../../../components/ui/button"
import { X } from "lucide-react"
import { CommentsList } from "./CommentsList"
import { CommentArea } from "./CommentArea"
import { CREATE_COMMENT } from "../../../lib/graphql/mutations/Comment"
import { toast } from "sonner"
import { TOGGLE_VOTE } from "../../../lib/graphql/mutations/Vote"

interface IdeaDetailDrawerProps {
  idea?: Idea
  loading: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function IdeaDetailDrawer({
  open,
  onOpenChange,
  idea,
  loading,
}: IdeaDetailDrawerProps) {
  const [commentContent, setCommentContent] = useState("")
  const ideaId = idea?.id
  const [createCommentMutation, { loading: commentLoading }] = useMutation(
    CREATE_COMMENT,
    {
      onCompleted: () => {
        setCommentContent("")
      },
    }
  )

  const [toggleVoteMutation, { loading: voteLoading }] =
    useMutation(TOGGLE_VOTE)

  const handleToggleVote = async () => {
    if (!ideaId) return
    try {
      await toggleVoteMutation({
        variables: { ideaId },
        refetchQueries: [{ query: LIST_IDEAS }],
        awaitRefetchQueries: true,
      })
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível registrar o voto."
      )
    }
  }

  const handleAddComment = async () => {
    if (!ideaId) return
    if (!commentContent.trim()) {
      toast.error("Por favor insira um comentário")
      return
    }

    try {
      await createCommentMutation({
        variables: {
          ideaId,
          data: {
            content: commentContent,
          },
        },
        refetchQueries: [{ query: LIST_IDEAS }],
        awaitRefetchQueries: true,
      })
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível adicionar o comentário."
      )
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContentRight className="flex flex-col rounded-l-2xl">
        <div className="flex-shrink-0 p-6 bg-slate-100 rounded-l-2xl">
          <div className="flex items-start justify-between">
            <h2 className="text-2xl font-bold pr-4 flex-1">
              {loading ? "Carregando..." : idea?.title || "Ideia indisponível"}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="flex-shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          {idea && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {idea?.description || ""}
            </p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <CommentsList comments={idea?.comments || []} loading={loading} />
        </div>
        <CommentArea
          commentContent={commentContent || ""}
          setCommentContent={setCommentContent}
          handleAddComment={handleAddComment}
          handleVote={handleToggleVote}
          voteLoading={voteLoading}
          commentLoading={commentLoading}
          idea={idea}
        />
      </DrawerContentRight>
    </Drawer>
  )
}
