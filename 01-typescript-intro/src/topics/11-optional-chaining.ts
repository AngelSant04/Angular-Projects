export interface Passenger {
  name: string;
  children?: string[];
}

const pasenger1: Passenger = {
  name: "Angel",
};

const pasenger2: Passenger = {
  name: "Andrea",
  children: ["Rosa", "Enrique"],
};

const printChildren = (passenger: Passenger): number => {
    const howManyChildren = passenger.children?.length || 0;
//   const howManyChildren = passenger.children!.length;
  console.log(passenger.name, howManyChildren);
  return howManyChildren
};

printChildren(pasenger1);
printChildren(pasenger2);
