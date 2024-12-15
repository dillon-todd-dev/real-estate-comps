'use client';

import { useState } from 'react';
import AddressAutoComplete from './address-autocomplete';

export default function AddProperty() {
  const [address, setAddress] = useState<string>('');

  return (
    <div>
      <AddressAutoComplete setAddress={setAddress} />
      {address}
    </div>
  );
}
