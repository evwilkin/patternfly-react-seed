import * as React from 'react';
import {
  Button,
  CompassContent,
  CompassMainHeader,
  CompassPanel,
  Flex,
  FlexItem,
  MenuToggle,
  MenuToggleElement,
  SearchInput,
  Select,
  SelectList,
  SelectOption,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';

interface Automation {
  name: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  status: string;
}

const Builder: React.FunctionComponent = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [isTypeSelectOpen, setIsTypeSelectOpen] = React.useState(false);
  const [isStatusSelectOpen, setIsStatusSelectOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<string>('Type');
  const [selectedStatus, setSelectedStatus] = React.useState<string>('Status');

  // Sample data matching the screenshot structure
  const automations: Automation[] = [
    { name: 'New operations flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'Remote control desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'New operations flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'Remote control desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'Operational desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'Flow operations desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'Remote control desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'New operations flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'Cloud storage folders flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'Remote control desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'Observability flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'Remote control desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'Cloud storage folders flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'Operational desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'Remote control desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'AI automation workflow flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'Cloud storage folders flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'AI observing launch flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'Remote control desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'New operations flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'Remote control desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'AI observing launch flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'Operational desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'Cloud storage folders flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
    { name: 'AI automation workflow flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', type: '', status: 'Disabled' },
  ];

  const columnNames = {
    name: 'Name',
    createdAt: 'Created At',
    updatedAt: 'Updated At',
    type: 'Type',
    status: 'Status',
  };

  const onTypeSelect = (_event: React.MouseEvent<Element, MouseEvent> | undefined, value: string | number | undefined) => {
    setSelectedType(value as string);
    setIsTypeSelectOpen(false);
  };

  const onStatusSelect = (_event: React.MouseEvent<Element, MouseEvent> | undefined, value: string | number | undefined) => {
    setSelectedStatus(value as string);
    setIsStatusSelectOpen(false);
  };

  return (
    <>
      <CompassMainHeader title="Automations" toolbar={<SearchInput
            placeholder="Search automations"
            value={searchValue}
            onChange={(_event, value) => setSearchValue(value)}
            onClear={() => setSearchValue('')}
          />} />
      <CompassContent>
        <CompassPanel hasNoPadding>
          <Table aria-label="Automations table" variant="compact">
            <Thead>
              <Tr>
                <Th width={30}>{columnNames.name}</Th>
                <Th width={20}>{columnNames.createdAt}</Th>
                <Th width={20}>{columnNames.updatedAt}</Th>
                <Th width={15}>{columnNames.type}</Th>
                <Th width={15}>{columnNames.status}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {automations.map((automation, rowIndex) => (
                <Tr key={rowIndex}>
                  <Td dataLabel={columnNames.name}>{automation.name}</Td>
                  <Td dataLabel={columnNames.createdAt}>{automation.createdAt}</Td>
                  <Td dataLabel={columnNames.updatedAt}>{automation.updatedAt}</Td>
                  <Td dataLabel={columnNames.type}>{automation.type}</Td>
                  <Td dataLabel={columnNames.status}>
                    <Button variant="link" isInline>
                      {automation.status}
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CompassPanel>
      </CompassContent>
    </>
  );
};

export { Builder };
