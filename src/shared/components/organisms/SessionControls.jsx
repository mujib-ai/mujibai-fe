import { useState } from 'react';

import { CloudLightning, CloudOff } from 'react-feather';

import { Button } from '@/shared/components/atoms/ui/button';

function SessionStopped({ startSession }) {
  const [isActivating, setIsActivating] = useState(false);

  function handleStartSession() {
    if (isActivating) return;

    setIsActivating(true);
    startSession();
  }

  return (
    <Button
      onClick={handleStartSession}
      className="bg-primary hover:bg-primary/90 rounded-full px-10 py-6 text-base font-medium text-white shadow-md transition sm:px-14 sm:text-lg"
      icon={<CloudLightning height={16} />}
    >
      {isActivating ? 'Listen now...' : 'Listen now'}
    </Button>
  );
}

function SessionActive({ stopSession }) {
  return (
    <Button
      className="bg-primary hover:bg-primary/90 rounded-full px-10 py-6 text-base font-medium text-white shadow-md transition sm:px-14 sm:text-lg"
      onClick={stopSession}
      icon={<CloudOff height={16} />}
    >
      Stop Listen
    </Button>
  );
}

export default function SessionControls({
  startSession,
  stopSession,
  sendClientEvent,
  serverEvents,
  isSessionActive,
}) {
  return (
    <>
      {isSessionActive ? (
        <SessionActive
          stopSession={stopSession}
          sendClientEvent={sendClientEvent}
          serverEvents={serverEvents}
        />
      ) : (
        <SessionStopped startSession={startSession} />
      )}
    </>
  );
}
