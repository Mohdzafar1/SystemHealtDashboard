import PropTypes from 'prop-types';
import { set, sub } from 'date-fns';
import { faker } from '@faker-js/faker';
import React, { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

import { fToNow } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import notification_tone from "../../../../public/assets/audio/notification_tone.wav"
// ----------------------------------------------------------------------

const generateDummyThreatNotifications = () => [
  {
    id: faker.string.uuid(),
    title: 'Malware Detected',
    description: 'Malware detected on device XYZ',
    avatar: '/assets/icons/ic_notification_warning.svg',
    type: 'malware',
    createdAt: set(new Date(), { hours: 8, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.string.uuid(),
    title: 'Phishing Attempt',
    description: 'Phishing attempt detected on email abc@domain.com',
    avatar: '/assets/icons/ic_notification_warning.svg',
    type: 'phishing',
    createdAt: sub(new Date(), { hours: 2, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.string.uuid(),
    title: 'DDoS Attack',
    description: 'DDoS attack detected on server 123.45.67.89',
    avatar: '/assets/icons/ic_notification_warning.svg',
    type: 'ddos',
    createdAt: sub(new Date(), { hours: 4, minutes: 0 }),
    isUnRead: false,
  },
  {
    id: faker.string.uuid(),
    title: 'Unauthorized Access',
    description: 'Unauthorized access attempt detected on system',
    avatar: '/assets/icons/ic_notification_warning.svg',
    type: 'unauthorized_access',
    createdAt: sub(new Date(), { days: 1, hours: 1, minutes: 0 }),
    isUnRead: false,
  },
];

const THREAT_NOTIFICATIONS = generateDummyThreatNotifications();

// Array of different notification sounds
const notificationSounds = [
  notification_tone
];

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState(THREAT_NOTIFICATIONS);
  const totalUnRead = notifications.filter((item) => item.isUnRead).length;
  const [open, setOpen] = useState(null);
  const prevNotificationsRef = useRef(notifications);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  useEffect(() => {
    const prevNotifications = prevNotificationsRef.current;

    // Find new unread notifications
    const newNotifications = notifications.filter((notification) =>
      notification.isUnRead && !prevNotifications.find((prev) => prev.id === notification.id)
    );

    if (newNotifications.length > 0) {
      const notificationSound = new Audio(notificationSounds[0]); // Play default sound
      notificationSound.play().catch((error) => {
        console.error('Failed to play the notification sound:', error);
      });

      setTimeout(() => {
        notificationSound.pause();
        notificationSound.currentTime = 0;
      }, 3000); // Adjust the duration (3000 ms = 3 seconds) as needed
    }

    // Update the ref with current notifications
    prevNotificationsRef.current = notifications;
  }, [notifications]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newNotification = {
        id: faker.string.uuid(),
        title: 'New Threat Detected',
        description: 'New threat detected on your system',
        avatar: '/assets/icons/ic_notification_warning.svg',
        type: 'new_threat',
        createdAt: new Date(),
        isUnRead: true,
      };

      setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Threat Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title="Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List disablePadding>
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {notification.description}
      </Typography>
    </Typography>
  );

  return {
    avatar: <img alt={notification.title} src="/assets/icons/ic_notification_warning.svg" />,
    title,
  };
}
