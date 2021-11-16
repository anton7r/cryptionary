import { Show } from "solid-js";
import type { ApiData } from "../types/ApiData";

type InfoPaneProps = {
    store: ApiData;
}

const isEmpty = (store: ApiData) => store.market_caps == null || store.market_caps.length === 0;

const InfoPane = (props: InfoPaneProps) => (
    <Show
        when={!isEmpty(props.store)}
        fallback={
            <>
                <h2>Here you are going to see useful info</h2>
                <p>... as long as you fill the adjacent form</p>
            </>
        }
    >
        Nyt sit pitäis näkyy jotain
    </Show>
)

export { InfoPane }