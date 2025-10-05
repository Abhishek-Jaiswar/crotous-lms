import { Suspense } from 'react';
import VerifyRequest from './VerifyRequest'; 

export default function VerifyRequestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyRequest />
    </Suspense>
  );
}