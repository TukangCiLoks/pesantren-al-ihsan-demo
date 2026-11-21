import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

/**
 * Sesi Supabase Auth + status admin.
 * Mengembalikan { session, isAdmin, loading, error }.
 *
 * onAuthStateChange langsung memancarkan INITIAL_SESSION saat berlangganan,
 * jadi getSession() terpisah tidak diperlukan. Event berikutnya (SIGNED_IN,
 * SIGNED_OUT, TOKEN_REFRESHED) memperbarui state otomatis — termasuk logout
 * dari tab lain.
 */
export function useAuth() {
  const [state, setState] = useState({
    session: null,
    isAdmin: false,
    loading: isSupabaseConfigured,
    error: false,
  });

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;
    let aktif = true;

    async function terapkan(session) {
      if (!session) {
        if (aktif) setState({ session: null, isAdmin: false, loading: false, error: false });
        return;
      }
      // Tanya server apakah email sesi ini terdaftar sebagai admin.
      const { data, error } = await supabase.rpc('is_admin');
      if (aktif) setState({ session, isAdmin: data === true, loading: false, error: Boolean(error) });
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // Panggilan Supabase lain tidak boleh di-await langsung di dalam callback ini
      // (dapat mengunci klien); tunda ke tick berikutnya sesuai anjuran Supabase.
      setTimeout(() => terapkan(session), 0);
    });

    return () => {
      aktif = false;
      subscription.unsubscribe();
    };
  }, []);

  return state;
}
