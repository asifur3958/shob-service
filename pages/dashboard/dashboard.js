import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Sidebar from '../components/sidebar';

export default function Dashboard() {
  const router = useRouter();
  const isLoggedIn = Cookies.get('isLoggedIn');

  useEffect(() => {
    if (isLoggedIn !== 'true') {
      router.push('/Signin');
    }
  }, [isLoggedIn, router]);

  return (
    <div>
      <Sidebar/>
    </div>
  );
}
