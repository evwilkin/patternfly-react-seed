import * as React from 'react';
import {
  CompassContent,
  CompassPanel,
  SearchInput,
  Title,
  CompassMainHeader,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
} from '@patternfly/react-core';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';

interface GlossaryTerm {
  term: string;
  description: string;
}

const glossaryData: GlossaryTerm[] = [
  {
    term: 'Ansible Automation Platform',
    description:
      'Ansible Automation Platform provides an enterprise framework for building and operating IT automation at scale. It provides a consistent way to automate the provisioning, configuration, and management of IT infrastructure and applications across hybrid cloud environments.',
  },
  {
    term: 'Approval Manager',
    description:
      'An Approval Manager is a system or component that oversees the approval processes within an organization. It manages the workflow of requests, ensuring that they are reviewed and approved by the appropriate personnel before proceeding to the next stage.',
  },
  {
    term: 'Core Agent Manager',
    description:
      'The Core Agent Manager is a central component responsible for overseeing the lifecycle and operations of agents within a system. It handles tasks such as agent creation, configuration, monitoring, and termination, ensuring that agents function correctly and efficiently.',
  },
  {
    term: 'MCP Server',
    description:
      'In the context of AI, the Model Context Protocol (MCP) is an open-source standard that provides a universal way for AI models to connect with and use external data, tools, and systems.',
  },
  {
    term: 'Tool Registry',
    description:
      'A Tool Registry is a centralized repository that stores and manages information about various tools, including their configurations, versions, and usage policies. It facilitates easy access and integration of tools within a system or application.',
  },
  {
    term: 'Workflow Engine',
    description:
      'A workflow engine is a software application that manages and executes modeled business processes. It interprets the process definitions, manages the state of process instances, and coordinates the execution of tasks according to the defined workflow.',
  },
];

export interface ISupportProps {
  sampleProp?: string;
}

const Support: React.FunctionComponent<ISupportProps> = () => {
  useDocumentTitle('Support - Glossary');
  const [searchValue, setSearchValue] = React.useState('');

  const onSearchChange = (_event: React.FormEvent<HTMLInputElement>, value: string) => {
    setSearchValue(value);
  };

  const onClear = () => {
    setSearchValue('');
  };

  const filteredGlossary = React.useMemo(() => {
    if (!searchValue) {
      return glossaryData;
    }
    const lowerSearch = searchValue.toLowerCase();
    return glossaryData.filter(
      (item) =>
        item.term.toLowerCase().includes(lowerSearch) || item.description.toLowerCase().includes(lowerSearch)
    );
  }, [searchValue]);

  return (
    <>
      <CompassMainHeader title={<Title headingLevel="h1">Glossary</Title>} toolbar={<SearchInput
        placeholder="Search"
        value={searchValue}
        onChange={(_event, value) => setSearchValue(value)}
        onClear={() => setSearchValue('')}
      />} />
      <CompassContent>
        <CompassPanel>
          <DescriptionList>
            {filteredGlossary.map((item, index) => (
              <DescriptionListGroup key={index}>
                <DescriptionListTerm>{item.term}</DescriptionListTerm>
                <DescriptionListDescription>{item.description}</DescriptionListDescription>
              </DescriptionListGroup>
            ))}
          </DescriptionList>
        </CompassPanel>
      </CompassContent>
    </>
  );
};

export { Support };
