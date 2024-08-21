import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./CustomerGeographyMap'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
});

export default DynamicMap;