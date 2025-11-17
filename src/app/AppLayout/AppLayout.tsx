import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ActionList,
  ActionListGroup,
  ActionListItem,
  Button,
  Compass,
  CompassHeader,
  CompassMessageBar,
  CompassPanel,
  Dropdown,
  DropdownItem,
  DropdownList,
  Flex,
  MastheadBrand,
  MastheadLogo,
  MenuToggle,
  MenuToggleElement,
  Tab,
  TabTitleText,
  Tabs,
  TabsComponent,
  Tooltip,
} from '@patternfly/react-core';
import { useTheme } from '@app/utils/ThemeContext';
import { flattenedRoutes } from '@app/routes';
import backgroundImg from '@app/assets/background.jpg';
import OutlinedClosedCaptioningIcon from '@patternfly/react-icons/dist/esm/icons/outlined-closed-captioning-icon';
import VolumeUpIcon from '@patternfly/react-icons/dist/esm/icons/volume-up-icon';
import OutlinedPlusSquareIcon from '@patternfly/react-icons/dist/esm/icons/outlined-plus-square-icon';
import OutlinedBellIcon from '@patternfly/react-icons/dist/esm/icons/outlined-bell-icon';
import OutlinedQuestionCircleIcon from '@patternfly/react-icons/dist/esm/icons/outlined-question-circle-icon';
import TasksIcon from '@patternfly/react-icons/dist/esm/icons/tasks-icon';
import OutlinedSquareIcon from '@patternfly/react-icons/dist/esm/icons/outlined-square-icon';
import { RHAutomationsLogo } from '@app/assets/RHAutomationsLogo';
import { MessageBar } from '@patternfly/chatbot';

interface IAppLayout {
  children: React.ReactNode;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { isDarkTheme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Determine active tabs based on current route
  const getActiveTabIndex = React.useCallback(() => {
    const path = location.pathname;
    // get index of path in flattenedRoutes
    const index = flattenedRoutes.findIndex(route => route.path === path);
    return index || 0;
  }, [location.pathname]);

  const [activeTab, setActiveTab] = React.useState(getActiveTabIndex);

  // Update active tab when route changes
  React.useEffect(() => {
    setActiveTab(getActiveTabIndex());
  }, [getActiveTabIndex]);

  const handleTabSelect = (_event: React.MouseEvent<HTMLElement>, tabIndex: number | string) => {
    const idx = tabIndex as number;
    setActiveTab(idx);
    navigate(flattenedRoutes[idx].path);
  };

  const navContent = (
    <CompassPanel isPill hasNoPadding>
      <Tabs
        activeKey={activeTab}
        isNav
        onSelect={handleTabSelect}
        component={TabsComponent.nav}
        aria-label="Main navigation"
        inset={{ default: 'insetXl' }}
      >
        {flattenedRoutes.map((route, idx) => (
          <Tab key={idx} eventKey={idx} title={<TabTitleText>{route.label}</TabTitleText>} isDisabled={route.isDisabled} />
        ))}
      </Tabs>
    </CompassPanel>
  );

  const userDropdownItems = (
    <>
      <DropdownItem>My profile</DropdownItem>
      <DropdownItem>User management</DropdownItem>
      <DropdownItem>Logout</DropdownItem>
    </>
  );

  const userDropdown = (
    <Dropdown
      isOpen={isDropdownOpen}
      onSelect={() => setIsDropdownOpen(false)}
      onOpenChange={(isOpen: boolean) => setIsDropdownOpen(isOpen)}
      popperProps={{ position: 'right' }}
      toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
        <MenuToggle
          ref={toggleRef}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          isExpanded={isDropdownOpen}
          variant="plain"
          isCircle
        >
          <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapMd' }}>
            User Name
            {/* <Avatar src={avatarSvg} alt="User avatar" size="md" /> */}
          </Flex>
        </MenuToggle>
      )}
    >
      <DropdownList>{userDropdownItems}</DropdownList>
    </Dropdown>
  );

  const sidebarStartContent = (
    <CompassPanel isPill>
      <ActionList isIconList isVertical>
        <ActionListGroup>
          <ActionListItem>
            <Tooltip content="Plus square">
              <Button isCircle variant="plain" icon={<OutlinedPlusSquareIcon />} aria-label="Plus square" />
            </Tooltip>
          </ActionListItem>
          <ActionListItem>
            <Tooltip content="Square">
              <Button isCircle variant="plain" icon={<OutlinedSquareIcon />} aria-label="Square" />
            </Tooltip>
          </ActionListItem>
        </ActionListGroup>
        <ActionListItem>
          <Tooltip content="Help">
            <Button isCircle variant="plain" aria-label="AI circle">
              <div className="ai-shadow" />
            </Button>
          </Tooltip>
        </ActionListItem>
        <ActionListGroup>
          <ActionListItem>
            <Tooltip content="Volume">
              <Button isCircle variant="plain" icon={<VolumeUpIcon />} aria-label="Volume up" />
            </Tooltip>
          </ActionListItem>
          <ActionListItem>
            <Tooltip content="Closed captioning">
              <Button isCircle variant="plain" icon={<OutlinedClosedCaptioningIcon />} aria-label="Closed captioning" />
            </Tooltip>
          </ActionListItem>
        </ActionListGroup>
      </ActionList>
    </CompassPanel>
  );

  const sidebarEndContent = (
    <CompassPanel isPill>
      <ActionList isIconList isVertical>
        <ActionListGroup>
          <ActionListItem>
            <Tooltip content="Notifications">
              <Button isCircle variant="plain" icon={<OutlinedBellIcon />} aria-label="Notifications" />
            </Tooltip>
          </ActionListItem>
        </ActionListGroup>
        <ActionListGroup>
          <ActionListItem>
            <Tooltip content="Tasks">
              <Button isCircle variant="plain" icon={<TasksIcon />} aria-label="Tasks" />
            </Tooltip>
          </ActionListItem>
          <ActionListItem>
            <Tooltip content="Question">
              <Button isCircle variant="plain" icon={<OutlinedQuestionCircleIcon />} aria-label="Question" />
            </Tooltip>
          </ActionListItem>
        </ActionListGroup>
      </ActionList>
    </CompassPanel>
  );

  const headerContent = (
    <CompassHeader
      logo={
        <MastheadBrand>
          <MastheadLogo>
            <RHAutomationsLogo />
          </MastheadLogo>
        </MastheadBrand>
      }
      nav={navContent}
      profile={userDropdown}
    />
  );

  const southContent = (
    <CompassMessageBar>
      <CompassPanel isPill hasNoPadding hasNoBorder>
        <MessageBar
          isCompact
          onSendMessage={() => {}}
          alwayShowSendButton
          hasAttachButton={false}
          hasAiIndicator
          isThinking={false}
        />
      </CompassPanel>
      <div className="pf-v6-screen-reader" aria-live="polite">{"AI is thinking..."}</div>
    </CompassMessageBar>
  );

  return (
    <Compass
      header={headerContent}
      sidebarStart={sidebarStartContent}
      main={children}
      sidebarEnd={sidebarEndContent}
      backgroundSrcDark={backgroundImg}
      backgroundSrcLight={backgroundImg}
      footer={['/configure', '/configuration'].includes(location.pathname) ? southContent : null}
    />
  );
};

export { AppLayout };
