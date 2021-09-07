<script>
import {select_button} from "./button_utils"

export let tab_list;
export let tab_panels
export let style = false;

let active = tab_list[0].id
let chooser = active

$: active = chooser


function nt_select_button(id) {
    chooser = select_button(id,style,tab_list)
}

function select_me(evt) {
    let id = evt.target.id
    if ( id ) {
        nt_select_button(id)
    }
}

setTimeout(() => { nt_select_button(tab_list[0].id) },0)


</script>

<div class="tab-list-container"  style={ (style && (style.header !== undefined)) ? style.header : "" } >
{#each tab_list as tab (tab.id) }
    <button id={tab.id} 
    class={(active === tab.id) ? "tab selected" : "tab"}
    on:click={select_me} 
    style={(tab.style && tab.style.button && tab.style.button.inactive ) ? tab.style.button.inactive : (style && style.button && style.button.inactive ? style.button.inactive : "") }>{tab.name}</button>
{/each}    
</div>
{#each tab_list as tab (tab.id) }
{#if active === tab.id }
<div class="tab-panel" style={(tab.style && tab.style.panel) ? tab.style.panel : (style && style.panel ? style.panel : "") }>
    {#if (tab_panels[tab.id] !== undefined) && tab_panels[tab.id] }
    <svelte:component this={tab_panels[tab.id].component} {...(tab_panels[tab.id].parameters)} />
    {:else}
        {@html tab.content}
    {/if}
</div>
{/if}
{/each}

<style>
    .tab {
        height: 40px;
        font-weight: bold;
        color:floralwhite;
        cursor: pointer;
        background-color: darkslategray;
        width: 10%;
    }

    .tab-list-container {
        width: 100%;
        border : solid 1px black;
        border-top: none;
        background-color: darkslategray;
        height: 40px;
        max-height:min-content;
        padding-bottom: none;
    }

    .selected {
        color: black;
        border: solid 2px rgb(8, 37, 8);
        background-color: azure;
    }

    .tab-panel {
        background-color: azure;
        border: solid 1px navy;
        border-top: none;
        min-height: 400px;
    }

</style>