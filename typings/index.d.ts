// Types for client
// https://stackoverflow.com/questions/61056465/writing-types-for-a-function-with-a-different-signature-in-nodejs
// export function renderReact<C extends React.ComponentType>(name: string, component: C): C;
// export function renderReactStatic(name: string, component: React.ComponentType): void;

// Types for server
export function renderReact<C extends React.ComponentType>(
    name: string,
    component: C
): (props: React.ComponentProps<C>) => string;

export function renderReactStatic<C extends React.ComponentType>(
    name: string,
    component: C
): (props: React.ComponentProps<C>) => string;
