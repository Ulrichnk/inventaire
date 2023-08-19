import { createContext , useContext} from "react";
import { User } from "./types/Types";

type AuthContextType ={
  user: User | null;
  // Autres propriétés du contexte si nécessaire
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
  }
  
  export default AuthContext;