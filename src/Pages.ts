import { useHistory } from 'react-router-dom';

const Pages = {
  main: '/',
  about: '/about',
  detect: '/catalog',
} as const;

type PagesType = typeof Pages[keyof typeof Pages];

const PagesTitle: { [P in PagesType]?: string } = {
  '/': '',
  '/about': '使用方法',
  '/catalog': '検出できる情報一覧',
};

const useRedirect = () => {
  const history = useHistory();
  return (page: PagesType, variables: string[] = []) => {
    var res: string = page;
    variables.forEach((v) => {
      res = res.replace(/:[^/]+/, v);
    });
    return history.push(res);
  };
};

export { useRedirect };
export type { PagesType };
export { PagesTitle };
export default Pages;
