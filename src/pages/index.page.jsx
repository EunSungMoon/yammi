import { getItems } from '../modules/test/fetch';

export const getServerSideProps = async ({ req }) => {
  const [items] = await Promise.all([getItems({})]);

  return {
    props: {
      initialData: {
        items,
      },
    },
  };
};

export default function Home({ initialData }) {
  console.log('🚀 ~ Home ~ initialData:', initialData);
  return (
    <>
      <div>hello world</div>
    </>
  );
}
