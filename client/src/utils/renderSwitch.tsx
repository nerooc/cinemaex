/* to be developed */

export const renderSwitch = (
  param: string,
  success: JSX.Element,
  error: JSX.Element
) => {
  switch (param) {
    case 'idle' || 'pending':
      return <p>Loading post...</p>;
    case 'error':
      return { error }; // It will be a specific Error component
    case 'success':
      return { success };
  }
};
