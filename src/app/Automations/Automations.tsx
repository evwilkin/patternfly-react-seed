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
  Switch,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';
import {
  ActionsColumn,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import PlayIcon from '@patternfly/react-icons/dist/esm/icons/play-icon';
import ListIcon from '@patternfly/react-icons/dist/esm/icons/list-icon';
import { Link } from 'react-router-dom';

interface Automation {
  name: string;
  createdAt: string;
  updatedAt: string;
  tags: string;
  disabled: boolean;
}

const Automations: React.FunctionComponent = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [isTypeSelectOpen, setIsTypeSelectOpen] = React.useState(false);
  const [isStatusSelectOpen, setIsStatusSelectOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<string>('Type');
  const [selectedStatus, setSelectedStatus] = React.useState<string>('Status');

  // Sample data matching the screenshot structure
  const automations: Automation[] = [
    { name: 'New operations flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'Remote control desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'New operations flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'Remote control desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'Operational desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'Flow operations desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'Remote control desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'New operations flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'Cloud storage folders flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'Remote control desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'Observability flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'Remote control desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'Cloud storage folders flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'Operational desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'Remote control desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'AI automation workflow flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'Cloud storage folders flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'AI observing launch flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'Remote control desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'New operations flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'Remote control desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'AI observing launch flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'Operational desk', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'Cloud storage folders flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
    { name: 'AI automation workflow flow', createdAt: '1/3/2025 5:12:17 PM', updatedAt: '1/3/2025 5:12:17 PM', tags: '', disabled: true },
  ];

  const filteredAutomations = React.useMemo(() => {
    return automations.filter(automation => automation.name.toLowerCase().includes(searchValue.toLowerCase()));
  }, [searchValue]);

  const columnNames = {
    name: 'Name',
    createdAt: 'Created At',
    updatedAt: 'Updated At',
    tags: 'Tags',
    disabled: 'State',
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
      <CompassMainHeader title={<Title headingLevel="h1" size="xl">Automations</Title>} toolbar={<SearchInput
            placeholder="Search automations"
            value={searchValue}
            onChange={(_event, value) => setSearchValue(value)}
            onClear={() => setSearchValue('')}
          />} />
      <CompassContent>
        <CompassPanel isScrollable hasNoPadding>
          <Table isPlain aria-label="Automations table" isStickyHeader>
            <Thead>
              <Tr>
                <Th width={30}>{columnNames.name}</Th>
                <Th width={20}>{columnNames.createdAt}</Th>
                <Th width={20}>{columnNames.updatedAt}</Th>
                <Th width={15}>{columnNames.tags}</Th>
                <Th width={15}>{columnNames.disabled}</Th>
                <Th screenReaderText="Automation actions" />
              </Tr>
            </Thead>
            <Tbody>
              {filteredAutomations.map((automation, rowIndex) => (
                <Tr key={rowIndex}>
                  <Td dataLabel={columnNames.name}>
                    <Link to={`/automations/${rowIndex}`}>{automation.name}</Link>
                  </Td>
                  <Td dataLabel={columnNames.createdAt}>{automation.createdAt}</Td>
                  <Td dataLabel={columnNames.updatedAt}>{automation.updatedAt}</Td>
                  <Td dataLabel={columnNames.tags}>{automation.tags}</Td>
                  <Td dataLabel={columnNames.disabled}>
                    <Switch
                      id={`enable-automation-${automation.name}`}
                      label={automation.disabled ? 'Disabled' : 'Enabled'}
                      defaultChecked={!automation.disabled}

                    />
                  </Td>
                  <Td isActionCell>
                    <ActionsColumn
                      items={[
                        {
                          title: <><PlayIcon /> Run automation</>,
                          onClick: () => console.log(`clicked on Some action, on row ${rowIndex}`)
                        },
                        {
                          title: <><ListIcon /> View run history</>,
                          onClick: () => console.log(`clicked on Some action, on row ${rowIndex}`)
                        }
                      ]}
                    />
                </Td>
                </Tr>
              ))}
              <Tr
                className="bottom-sticky-row"
              >
                <Td dataLabel="Total automations count">{filteredAutomations.length} automations{filteredAutomations.length !== automations.length ? ` (of ${automations.length} total)` : ''}</Td>
                <Td />
                <Td />
                <Td />
                <Td />
                <Td />
              </Tr>
            </Tbody>
          </Table>
        </CompassPanel>
      </CompassContent>
    </>
  );
};

export { Automations };
