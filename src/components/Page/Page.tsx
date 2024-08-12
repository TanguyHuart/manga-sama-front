import { useEffect } from 'react';
import './Page.scss';

interface PageProps {
  children: React.ReactNode;
}
function Page({ children }: PageProps) {
  return <main className="page__container">{children}</main>;
}

export default Page;
