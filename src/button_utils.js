
export function component_mapper(tab_tree,component_map) {
    if ( tab_tree.tab_panels ) {
        let sub_tree = tab_tree.tab_panels
        for ( let pdef in sub_tree ) {
            let panel = sub_tree[pdef]
            if ( panel ) {
                if ( panel.component ) {
                    let comp = component_map[panel.component]
                    if ( comp ) {
                        panel.component = comp
                    }
                }
                // recurse here
                component_mapper(panel.parameters,component_map)
            }
        }
    }
}


export function unstyle_buttons(tab_list,style) {
    for ( let i = 0; i < tab_list.length; i++ ) {
        let id = tab_list[i].id
        let tab = document.getElementById(id)
        if ( tab ) {
            tab.style = (tab_list[i].style && tab_list[i].style.button && tab_list[i].style.button.inactive) ? tab_list[i].style.button.inactive : (style && style.button.inactive ? style.button.inactive : "")
        }
    }
}


export function tab_def_from_id(id,tab_list) {
    for ( let i = 0; i < tab_list.length; i++ ) {
        let tid = tab_list[i].id
        if (tid == id) {
            return tab_list[i]
        }
    }
    return false
}




export function select_button(id,style,tab_list) {
    let el = document.getElementById(id)
    if ( el ) {
        unstyle_buttons(tab_list,style)
        let el_style = "" // el.style
        let tdef = tab_def_from_id(id,tab_list)
        if ( tdef && tdef.style && tdef.style.button && tdef.style.button.active ) {
            el_style = tdef.style.button.active
            el.style = el_style
        } else if ( style && style.button && style.button.active ) {
            el_style = style.button.active
            el.style = el_style
        } else {
            el.style = ""
        }
        return id
    }
    return tab_list[0].id
}

