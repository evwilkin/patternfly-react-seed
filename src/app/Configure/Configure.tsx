import * as React from 'react';
import {
  Button,
  Form,
  FormGroup,
  TextInput,
  TextArea,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  ToolbarGroup,
  CompassMainHeader,
  Title,
  CompassPanel,
  CompassContent,
  Card,
  CardBody,
  CardHeader
} from '@patternfly/react-core';
import ServerIcon from '@patternfly/react-icons/dist/esm/icons/server-icon';
import { useNavigate } from 'react-router-dom';

const Configure: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [serverName, setServerName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [apiUrl, setApiUrl] = React.useState('');
  const [apiKey, setApiKey] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string>('MCP Server');

  const onToggleClick = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = (_event: React.MouseEvent<Element, MouseEvent> | undefined, value: string | number | undefined) => {
    setSelected(value as string);
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { serverName, description, apiUrl, apiKey, integrationType: selected });
  };

  const handleCancel = () => {
    setServerName('');
    setDescription('');
    setApiUrl('');
    setApiKey('');
    setSelected('MCP Server');
  };

  return (
    <>
    <CompassMainHeader title={<Title headingLevel="h1">Configure Integration</Title>}  toolbar={(
      <Toolbar hasNoPadding>
        <ToolbarContent>
          <ToolbarGroup>
            <ToolbarItem>
              <Button
                variant="primary"
                onClick={() => {}}
              >
                Add integration
              </Button>
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarItem>
              <Button variant="secondary" onClick={() => navigate('/configuration')}>Cancel</Button>
            </ToolbarItem>
          </ToolbarGroup>
        </ToolbarContent>
      </Toolbar>
    )} />

      <CompassContent>
        <CompassPanel>
          <Form onSubmit={handleSubmit}>
            <FormGroup label="Integration type">
              <Card id="mcp-server" isSelectable isSelected={true} className="integration-type-tile">
                <CardHeader
                  selectableActions={{
                    selectableActionId: 'mcp-server',
                    selectableActionAriaLabelledby: 'single-selectable-card-example-2',
                    name: 'mcp-server',
                    variant: 'single',
                    onChange: () => {},
                    hasNoOffset: true,
                    isHidden: true
                  }}
                >
                  <ServerIcon />
                </CardHeader>
                <CardBody>
                  <div>MCP Server</div>
                </CardBody>
              </Card>
            </FormGroup>

            <FormGroup label="Server name / ID" isRequired fieldId="server-name">
              <TextInput
                isRequired
                type="text"
                id="server-name"
                name="server-name"
                value={serverName}
                onChange={(_event, value) => setServerName(value)}
                placeholder="Enter server name / ID"
              />
            </FormGroup>

            <FormGroup label="Description" fieldId="description">
              <TextArea
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(_event, value) => setDescription(value)}
                placeholder="Enter description"
                resizeOrientation="vertical"
              />
            </FormGroup>

            <FormGroup label="API URL" isRequired fieldId="api-url">
              <TextInput
                isRequired
                type="text"
                id="api-url"
                name="api-url"
                value={apiUrl}
                onChange={(_event, value) => setApiUrl(value)}
                placeholder="Enter API URL"
              />
            </FormGroup>

            <FormGroup label="API key" fieldId="api-key">
              <TextInput
                type="password"
                id="api-key"
                name="api-key"
                value={apiKey}
                onChange={(_event, value) => setApiKey(value)}
                placeholder="Enter API key"
              />
            </FormGroup>
          </Form>
        </CompassPanel>
      </CompassContent>
    </>
  );
};

export { Configure };
