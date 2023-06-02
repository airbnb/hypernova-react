// Types for client
// https://stackoverflow.com/questions/61056465/writing-types-for-a-function-with-a-different-signature-in-nodejs
// export function renderReact<C extends React.ComponentType>(name: string, component: C): C;

// Types for server
export function renderReact<C extends React.ComponentType>(
  name: string,
  component: C
): (props: React.ComponentProps<C>) => string;
