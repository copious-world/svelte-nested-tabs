*Psst — looking for an app template? Go here --> [sveltejs/template](https://github.com/sveltejs/template)*

---

# svelte-nested-tabs

This component lets you created nested tabs. 

The tabs are buttons that you may style (or use defaults). And, below the tabs (a row of buttons) will be the active panel.

## Overview
### Very quickly ...

| tab1 | *tab 2* | tab 3
-------------------------

> You will see an active tabs contents.
> 
>  Makes your day. (Say it's tab 2)
> 
> 
-------------------------

You may put any content into the panel. That may be another component or some text (rendered as html). The component may be another tab compnent.

### Gist of operation

You have to define a JSON structure in your application. 

The nested tabs will be made possible by setting a **component** field to the Tabs object, which you import from *sevlte-nested-tabs*.

The **component** field says what goes into a tab panel.

Link to example...
[svetle-nested-tabs example](https://github.com/rleddy/svelte-examples)

## Setting up

* npm install --save svelte-nested-tabs

Put this into your svelte project

## How to Program

In your svelte app you will want to import the components.

```
import Tabs from "svelte-nested-tabs"
```

Here is what the HTML part of the svelte app looks like:

```
<main>
	<h1>Hello {name}!</h1>
	<div class="tab-container" >
		<Tabs {...tab_def} />
	</div>	
</main>

```

Notice that the tab is getting one paramter, **tab\_def**,

This is a JSON structure that needs to have at least two fields. The field are:

* ***tab\_list***
* ***tab\_panels***

The first of these fields, ***tab\_list***, is an array of object, one fore each tab. Each object of the array has some fields as well. Minimally they are:

```
	{ 
		"id" : " a unique tab id",
		"name" : "the tab lable",
		"content" : "will be display if the panel is not defined"
	}
```		

The field, ***tab\_panels***, is a map from the **id**s to panel defintions. Not all panels have to be defined. If not, the **content** field will be displayed in the panel. Or, the panel may contain a compontent. WHen the panel contains a component, the object mapped by the **id** of the panel will contain two fields, one will be the **component** field, the other will be **parameters** for the component.

Here is the basic structure:

```
	{
		"component" : <A svelte compontent from an import statement>,
		"parameters" : <parameter that will be expanded by ellipses>
	}

```

When the Tabs component uses the component from the map, it will pass the paremters in the following manner:

```
	<ComponetNamedInField {...parameters} />
```

This is a pattern that may be found in tutorial in Svelte docs. The Tabs component takes care of the call. But, it needs to have the component and parameters passed to it.

## JSON structure for one nested tab list

The following is the structure need for tab buttons, "tutorial,example,colors".

The tabs, "example" has two nested tabs, which are defined under panels. It has two tabs, "jumping jack" and "nick nack".  Notice that the **id** fields are named in terms of level and count. It is a way for the application to distinguish all the tabs. DOM elements will have these as *id*s. So, it would be good to keep them unique per tab. The developer will likely want to use some organized way of naming them.

Notice that the field path tab_panels.l1_2.component has a value **Tabs**. This is the same **Tabs** field that was brought in by the import statement above in "How to Program"


```
	let tab_list_def = {
		"tab_list" : [
			{ 
				"id" : "l1_1",
				"name" : "tutorial",
				"content" : "not much"
			},
			{ 
				"id" : "l1_2",
				"name" : "example",
				"content" : "won't see this"
			},
			{ 
				"id" : "l1_3",
				"name" : "colors",
				"content" : "superfluous..."
			}
		],
		"tab_panels" : {
			"l1_1" : false,
			"l1_2" : {
				"component" : Tabs,
				"parameters" : {
					"tab_list" : [
									{ 
										"id" : "l2_1",
										"name" : "jumping jack",
										"content" : "bouncy"
									},
									{ 
										"id" : "l2_2",
										"name" : "nick nack",
										"content" : "likes momentos"
									}
								],
					"tab_panels" : {
						"l2_1" : false,
						"l2_2" : false
					},
				}
			}
		}
	}

```

So, nesting is done by using this data structure. And, don't forget that the a field such as tab_panels.l1_2.component does not have to be a Tabs component. It can be any compnent that your application can import and provide a parameters structure that the component can use.

## Styling

There are a number of ways to configure styling for Svelte components from the highest level. There is some work each way. For this component, the author has decided to use fields for customization. 

A style field can be added to a panel as a sibling to "**component**" and "**parameters**" or a style field can be added to an object in the **tab\_list**. The lower down the style is, the more dominant it is, overriding styles on higher levels. Also, the component styles are independent. So, the parent tabs will not influence the descendant tabs. There is a default within the tab component. Influence is then from the parameters field down to the tab list.

Here is an example of a styled nested tab.

```
let tab_def = {
	"style" : {
		"header" : "background-color:grey",
		"button" : {
			"active" : "color:red"
		}
	},
	"tab_list" : [
		{ 
			"id" : "l1_1",
			"name" : "tutorial",
			"content" : "not much",
			"style" : {
				"panel" : "background-color:white",
				"button" : {
					"active" : "color:purple"
				}
			}
		},
		{ 
			"id" : "l1_2",
			"name" : "example",
			"content" : "too much",
			"style" : {
				"panel" : "background-color:yellow"
			}
		},
		{ 
			"id" : "l1_3",
			"name" : "colors",
			"content" : "superfluous...",
			"style" : {
				"panel" : "background-color:snow"
			}
		}
	],
	"tab_panels" : {
		"l1_1" : false,
		"l1_2" : {
			"component" : "Tabs",
			"parameters" : {
				"style" : {
					"header" : "background-color:#FEFEFF",
					"panel" : "height:80%;background-color:#FEFEFF",
					"button" : {
						"inactive" : "background-color:#FFFFEA;color:blue"
					} 
				},
				"tab_list" : [
								{ 
									"id" : "l2_1",
									"name" : "jumping jack",
									"content" : "bouncy",
									"style" : {
										"button" : {
											"active" : "color:magenta"
										}
									}
								},
								{ 
									"id" : "l2_2",
									"name" : "nick nack",
									"content" : "chubby",
									"style" : {
										"button" : {
											"inactive" : "background-color:#FFEAFF"
										}
									}
								}
							],
				"tab_panels" : {
					"l2_1" : false,
					"l2_2" : false
				},
			}
		}
	}
}


```

In this case, both the top level tabs and the nested tabs have custom styles. 

You can see that the style definitions are done as inline style strings typical to HTML style attributes. The style object has keys for the parts of the display that may be styles, including "header", "panel", "button".

The "button" object may define "active" and "inactive" styles. When a button is selected and it's panel is displayed, it becomes active. And, the other buttons become inactive.

That is all for now. Here is a link the example again:

[svetle-nested-tabs example](https://github.com/rleddy/svelte-examples)

Please try it out and post any isues.


