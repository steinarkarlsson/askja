export const mapArrayToChoices = (items: string[]) =>
  items.map((item) => ({ id: item, name: item }));
