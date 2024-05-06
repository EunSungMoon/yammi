import { useRouter } from 'next/router';

import Layout from '../pages/_layout';

const useLayoutDispenser = () => {
  const router = useRouter();

  let LayoutComponent;
  if (router.pathname.startsWith('/auth')) {
    // LayoutComponent = AuthLayout;
  } else {
    LayoutComponent = Layout;
  }

  return { LayoutComponent };
};

export default useLayoutDispenser;
