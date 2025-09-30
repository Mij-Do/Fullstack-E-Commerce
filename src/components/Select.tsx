import {
    Combobox,
    Field,
    useListCollection,
} from "@chakra-ui/react";

const Select = () => {
    const { collection, filter } = useListCollection({
        initialItems: frameworks,
    });

    console.log(collection.items); 

    return (
        <Field.Root width="full">
        <Combobox.Root
            collection={collection}
            onInputValueChange={(e) => filter(e.inputValue)}
            positioning={{ strategy: "fixed", hideWhenDetached: true }}
        >
            <Combobox.Control>
            <Combobox.Input placeholder="Type to search" />
            <Combobox.IndicatorGroup>
                <Combobox.ClearTrigger />
                <Combobox.Trigger />
            </Combobox.IndicatorGroup>
            </Combobox.Control>

            <Combobox.Positioner zIndex={2000}>
            <Combobox.Content border="1px solid" minWidth="200px">
                <Combobox.Empty>No items found</Combobox.Empty>
                {collection.items.map((item) => (
                <Combobox.Item item={item} key={item.value}>
                    {item.label}
                    <Combobox.ItemIndicator />
                </Combobox.Item>
                ))}
            </Combobox.Content>
            </Combobox.Positioner>
        </Combobox.Root>
        </Field.Root>
    );
};

const frameworks = [
    { label: "SmartPhones", value: "smartphones" },
    { label: "Solid", value: "solid" },
];

export default Select;