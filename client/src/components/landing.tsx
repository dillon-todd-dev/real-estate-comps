import AddProperty from './add-property';
import AddressAutoComplete from './address-autocomplete';

export default function Landing() {
  return (
    <div className='flex flex-col justify-center items-center w-full min-h-screen p-8 pb-20 gap-16 sm:p-72'>
      <AddProperty />
    </div>
  );
}
