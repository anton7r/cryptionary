import type { Component, JSX } from 'solid-js';

type SidePanelProps = {
    children: JSX.ArrayElement | JSX.FunctionElement;
}

const SidePanel: Component<SidePanelProps> = (props: SidePanelProps) => {
    return (
        <div class="sidePanel">
            { props.children }
        </div>
    )
}

export default SidePanel;