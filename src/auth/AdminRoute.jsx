import { useAuthState } from "react-firebase-hooks/auth"
import { toast } from "react-hot-toast"
import { Navigate } from "react-router-dom"
import { useAdmin } from "../hooks/useAdmin"
import { auth } from "./firebase.init"

export function AdminRoute({ children }) {
  const [user, loading] = useAuthState(auth)
  const { data, isLoding } = useAdmin()

  if (loading || isLoding) return

  if (!user || !data.admin) {
    toast.error('unauthorized admin access', {
      id: 2
    })

    return <Navigate to='/' />
  }
  return children
}