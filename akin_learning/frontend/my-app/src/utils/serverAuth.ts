import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

interface UserData {
  id: string;
  name: string;
  email: string;
}

  export async function fetchUserData(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{ userData: UserData }>> {
    const sessionCookie = context.req.cookies?.session;

    const res = await fetch('http://localhost:5000/auth/validate', {
      credentials: 'include',
      headers: {
        Cookie: `session=${sessionCookie}`,
      },
    });

    if (res.status === 401) {
      return {
        redirect: {
          destination: '/auth/signin',
          permanent: false,
        },
      };
    }

    const userData: UserData = await res.json();
    return { props: { userData } };
  }
