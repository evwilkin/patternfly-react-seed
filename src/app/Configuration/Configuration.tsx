import * as React from 'react';
import {
  CompassContent,
  CompassPanel,
  Content,
  Bullseye,
  Button
} from '@patternfly/react-core';
import collageCircleSparklesWindowServerDarkRH from '@app/assets/collage-circle-sparkles-window-server-dark-RH.png';
import { useNavigate } from 'react-router-dom';


const Configuration: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <CompassContent>
      <CompassPanel>
        <Bullseye>
          <div>
            <img className="empty-configuration-img" src={collageCircleSparklesWindowServerDarkRH} alt="Collage" />
          </div>
          <Content className="pf-v6-u-pl-xl">
            <h2>No integrations have been configured yet.</h2>
            <p>Configure integrations to use them in automation. Integrations will allow for monitoring of server health and performance metrics, view server logs, and manage server settings and configurations.</p>
            <Button variant="primary" onClick={() => navigate('/configure')}>Add integration</Button>
          </Content>
        </Bullseye>
      </CompassPanel>
    </CompassContent>
  );
};

export { Configuration };
