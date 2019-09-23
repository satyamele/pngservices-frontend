import React from 'react';
import { Button, notification } from 'antd';

const openNotificationWithIcon = type => {
  notification[type]({
    message: '12 Lead for today',
    description:
      'Take follow up asap',
  });
};
const CustomNotifications = (props) =>{
        return(
        <div>
        
            <Button onClick={() => openNotificationWithIcon('error')}>Notifications</Button>
        </div>

        );
    }
export default CustomNotifications;