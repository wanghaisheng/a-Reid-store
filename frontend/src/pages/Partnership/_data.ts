import { Maybe } from '../../gql/graphql';

type thumbsType = {
  id: Maybe<string> | undefined;
  img: string;
};

export const partners: thumbsType[] = [
  {
    id: '1',
    img: '/assets/partners/partner-1.png',
  },
  {
    id: '2',
    img: '/assets/partners/partner-2.png',
  },
  {
    id: '3',
    img: '/assets/partners/partner-3.png',
  },
  {
    id: '4',
    img: '/assets/partners/partner-4.png',
  },
  {
    id: '5',
    img: '/assets/partners/partner-5.png',
  },
  {
    id: '6',
    img: '/assets/partners/partner-6.png',
  },
  {
    id: '7',
    img: '/assets/partners/partner-7.png',
  },
  {
    id: '8',
    img: '/assets/partners/partner-8.png',
  },
  {
    id: '9',
    img: '/assets/partners/partner-9.png',
  },
  {
    id: '10',
    img: '/assets/partners/partner-10.png',
  },
];
