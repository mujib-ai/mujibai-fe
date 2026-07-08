import { useState } from 'react';

import { Button } from '@/shared/components/atoms/ui/button';
import { CloudLightning, CloudOff } from 'react-feather';

interface SessionStoppedProps {
  startSession: () => void;
}

function SessionStopped({ startSession }: SessionStoppedProps) {
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
    >
      <CloudLightning height={16} />
      {isActivating ? 'Listen now...' : 'Listen now'}
    </Button>
  );
}

interface SessionActiveProps {
  stopSession: () => void;
}

function SessionActive({ stopSession }: SessionActiveProps) {
  return (
    <Button
      className="bg-primary hover:bg-primary/90 rounded-full px-10 py-6 text-base font-medium text-white shadow-md transition sm:px-14 sm:text-lg"
      onClick={stopSession}
    >
      <CloudOff height={16} />
      Stop Listen
    </Button>
  );
}

interface SessionControlsProps {
  startSession: () => void;
  stopSession: () => void;
  sendClientEvent?: (event: unknown) => void;
  serverEvents?: unknown[];
  isSessionActive: boolean;
}

export default function SessionControls({
  startSession,
  stopSession,
  isSessionActive,
}: SessionControlsProps) {
  return (
    <>
      {isSessionActive ? (
        <SessionActive stopSession={stopSession} />
      ) : (
        <SessionStopped startSession={startSession} />
      )}
    </>
  );
}
