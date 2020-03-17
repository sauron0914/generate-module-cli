/// <reference types="react-scripts" />

declare module '@loadable/component' {
    export default function Loadable(importFn: () => any): any
}
