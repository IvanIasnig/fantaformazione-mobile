/** Utente autenticato, ricavato dall'access token di Supabase Auth. */
export interface AuthUser {
  /** auth.users.id di Supabase (claim `sub`), usato anche come id del profilo. */
  id: string;
  email: string | undefined;
}
