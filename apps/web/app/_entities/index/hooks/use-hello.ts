import { useGet } from '@/_entities/common/hooks';

export function useHello() {
  const query = useGet<string>({
    url: [ '', ],
    key: [ 'api', 'hello', ],
  });

  return {
    hello: query.data,
    ...query,
  };
}
