'use client';

import * as React from 'react';

import type { ContactReason } from '../constants';

function generateTicket() {
  return 'SCP-' + Math.floor(Math.random() * 9000 + 1000);
}

export function useContactForm() {
  const [reason, setReason] = React.useState<ContactReason>('support');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [ticket, setTicket] = React.useState<string | null>(null);

  const isValid =
    name.trim().length > 0 &&
    /\S+@\S+\.\S+/.test(email) &&
    message.trim().length > 4;

  const submit = () => {
    if (isValid) setTicket(generateTicket());
  };

  const reset = () => {
    setTicket(null);
    setMessage('');
  };

  return {
    reason,
    setReason,
    name,
    setName,
    email,
    setEmail,
    company,
    setCompany,
    message,
    setMessage,
    ticket,
    isValid,
    submit,
    reset,
  };
}
