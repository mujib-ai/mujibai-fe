import React from 'react';

type ErrorProps = {
  error: {
    message: string;
    errors?: Record<string, string[]>;
  };
};

const ErrorContentBox = ({ error }: ErrorProps) => {
  return (
    <div className="space-y-2 rounded bg-red-100 p-4 text-red-800 shadow">
      {/* General message */}
      {error.message && <p>{error.message}</p>}

      {/* Field-specific errors */}
      {error.errors && (
        <ul className="list-inside list-disc text-sm text-red-700">
          {Object.entries(error.errors).map(([field, messages]) =>
            messages.map((msg, idx) => (
              <li key={`${field}-${idx}`}>
                <strong className="capitalize">{field}</strong>: {msg}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default ErrorContentBox;
