// import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

  export async function authenticateUser(): Promise<{
    userData: {  id: string; username: string; email: string}
  }> {

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    try {
      const res = await fetch('http://localhost:5000/auth/validate', {
      credentials: 'include',
      headers: {
        Cookie: `session=${sessionCookie}`,
      },
    });

    if (res.status === 401) {
      redirect('/auth/signin');
    }

    return await res.json();
    } catch (error) {
      console.error('Authentication error:', error);
      redirect('/auth/signin');
    }
}

