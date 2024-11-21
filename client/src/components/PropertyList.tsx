import { SimpleGrid } from '@chakra-ui/react';
import PropertyItem from './PropertyItem';

const PropertyList = () => {
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
      <PropertyItem />
      <PropertyItem />
      <PropertyItem />
      <PropertyItem />
      <PropertyItem />
      <PropertyItem />
      <PropertyItem />
      <PropertyItem />
      <PropertyItem />
    </SimpleGrid>
  );
};

export default PropertyList;
