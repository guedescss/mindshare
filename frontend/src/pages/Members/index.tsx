import { Crown, Plus, Search, UserRound } from "lucide-react"
import { Page } from "../../components/Page"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { useEffect, useState } from "react"
import { useQuery } from "@apollo/client/react"
import { LIST_MEMBERS } from "../../lib/graphql/queries/Members"
import { User } from "../../types"
import { MemberCard } from "./components/MemberCard"
import { useAuthStore } from "../../stores/auth"
import { InviteMemberDialog } from "./components/InviteMemberDialog"
import { EditMemberDialog } from "./components/EditMemberDialog"
import { DeleteMemberDialog } from "./components/DeleteMemberDialog"
import { toast } from "sonner"

export function Members() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openInviteDialog, setOpenInviteDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openEditMemberDialog, setOpenEditMemberDialog] = useState(false)
  const [member, setMember] = useState<User | null>(null)

  const currentUser = useAuthStore((state) => state.user)
  const currentUserId = currentUser?.id
  const { data, loading, error, refetch } = useQuery<{ listUsers: User[] }>(
    LIST_MEMBERS,
    { fetchPolicy: "network-only" }
  )
  const members = data?.listUsers ?? []
  const adminCount = members.filter(
    (member) => member.role === "admin" || member.role === "owner"
  ).length
  const memberCount = members.length - adminCount
  const canManageMembers = Boolean(currentUserId)

  useEffect(() => {
    if (error) toast.error(error.message)
  }, [error])

  const handleAddUser = () => {
    setOpenInviteDialog(true)
  }
  const handleEditUser = (editMember: User) => {
    if (!canManageMembers) return
    setMember(editMember)
    setOpenEditMemberDialog(true)
  }
  const handleDeleteUser = (deleteMember: User) => {
    if (!canManageMembers || deleteMember.id === currentUserId) return
    setMember(deleteMember)
    setOpenDeleteDialog(true)
  }

  const filteredMembers = members.filter((member) => {
    const query = searchQuery.trim().toLocaleLowerCase()
    return (
      member.name.toLocaleLowerCase().includes(query) ||
      member.email.toLocaleLowerCase().includes(query)
    )
  })

  return (
    <Page>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-1 text-3xl font-medium text-purple-600">Usuários</h1>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-200 px-2 py-0.5 text-xs text-indigo-900">
                <Crown className="h-3.5 w-3.5" />
                <span className="font-bold">{adminCount}</span>{" "}
                {adminCount === 1 ? "admin" : "admins"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-200 px-2 py-0.5 text-xs text-purple-900">
                <UserRound className="h-3.5 w-3.5" />
                <span className="font-bold">{memberCount}</span>{" "}
                {memberCount === 1 ? "membro" : "membros"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-4 justify-end">
              <Label htmlFor="search" className="text-sm whitespaces-nowrap">
                Busque membros:
              </Label>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Nome ou e-mail"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 max-w-[200px]"
                />
              </div>
            </div>
            {canManageMembers && (
              <>
                <div className="mx-2 h-8 w-px bg-gray-300" />
                <Button onClick={handleAddUser}>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo usuário
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="grid gap-4 xl:grid-cols-4">
          {!loading &&
            filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                isCurrentUser={member.id === currentUserId}
                canEdit={canManageMembers}
                canDelete={canManageMembers && member.id !== currentUserId}
                onEdit={() => handleEditUser(member)}
                onDelete={() => handleDeleteUser(member)}
              />
            ))}
        </div>
      </div>

      <InviteMemberDialog
        open={openInviteDialog}
        onOpenChange={setOpenInviteDialog}
        onCreated={() => refetch()}
      />

      <EditMemberDialog
        open={openEditMemberDialog}
        onOpenChange={setOpenEditMemberDialog}
        onUpdated={() => refetch()}
        member={member}
        canChangeRole={canManageMembers}
      />

      <DeleteMemberDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        member={member}
      />
    </Page>
  )
}
