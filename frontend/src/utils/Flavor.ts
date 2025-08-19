type Flavoring<FlavorType> = {
  _type?: FlavorType;
};

export type Flavor<BaseType, FlavorType> = BaseType & Flavoring<FlavorType>;
