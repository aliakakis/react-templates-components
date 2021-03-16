# React Templates Components

These components are not trying to re-invent the wheel or are anything new and spectacular. The main reason to use them
is because you should strive to write your React components as humanly readable as possible.

React components tend to become un-readable with two main issues affecting readability:

- Multiple separate render functions which return JSX in the main render() function
- One large render() function with multiple .map() functions or conditional operators and use of JavaScript in general

In order to reduce boilerplate this library is introducing components that act like a DSL template language but in the
form of React components.

## Suggestion

React has an enormous ecosystem of libraries and frameworks. However, after many years of React and Vue projects, I realize
that there are many "moving parts" to an application. Too many packages from various developers, some of which are no
longer maintained. Even this package, might feel unmaintained, especially after so many months of inactivity. Although, this
package is more or less feature complete, I strongly advise if you need to use it, then download the source code, instead of the
npm package. The source code itself is just plain React code with nothing fancy. The only possible issue is TypeScript which might
not be in your current tech-stack. However, you will find the JavaScript version at github under "src/js".

Finally, personally I try not to install too many packages. If I have to, then I tend to choose based on whether the package
is being developed by a corporate entity, or the community behind the package has enormous and consistent support.

## v2.2.6 Information

The Repeat component is proving more of a hassle than it should. I have marked it as experimental since in order for the component to work
it has to tamper the internals of a React component. Since this is quite volatile and bad practice I suggest using the usual .map() for iteration.
I apologize for any inconvenience.

## v2.2.0 Breaking changes

- Repeat component has been re-written in order to sort out issues with the key prop
- Repeat useRandomKeyForIteration has been removed please use setKey as shown in the docs.

**I apologize for any inconvenience but Repeat proved to be more complex than it should. Please READ CAREFULLY the updated
examples in the documentation below.**

## v2.1.1 Release Information

- Added 'useFragment' prop for all components, in case you do not want that extra HTML element added to the DOM.

**Please note that in case you set 'useFragment' to true the 'tag' and/or 'className' props will not have any effect on the component. Therefore if you have styled
the HTML element used in the 'tag' prop, you will get weird styling results.**

## v2.0.0 Important information

When I started building this library I used JavaScript. However, I am the first to admit that TypeScript is starting
to grow in me. This update brings the following changes:

- TypeScript re-write
- Functional components in order to be ready for the class based deprecation React will eventually bring upon us
- ParcelJS for building from source. I cannot stress how much faster and easier it was and the minified size in also smaller
- Repeat component has made some "hasty" assumptions about the key prop. New version and props are found in the documentation below

### Thoughts

I would like to apologize to anyone that is using this package and hope that any breaking changes are easy and fast to refactor.
As always, please do not hesitate to contact me in case you find a bug.

## Getting Started

### Prerequisites if building from source

You should have an installation of NodeJS any version and npm or yarn

More over React and PropTypes are MANDATORY for the components to work.

If you want to build from source by including them in your project, please take a look at my tsconfig.json since v2.0.0 is using TypeScript.

These components are using React features that were present from the early stages of the library therefore you should not
encounter any issues. Nevertheless, I do suggest a version of React 15+

### Installing

Npm:

```
npm install --save react-templates-components
```

Yarn:

```
yarn add react-templates-components
```

## Usage

#### Global props

**_The following props are available for all components:_**

- **tag**
  - type: **string**
  - default: **'div'**
  - description: **You can use here any tag or React element to enclose the children in the same time supporting semantic web**
- **className**
  - type: **string**
  - default: **" "**
  - description: **The usual value found in all React components that translate to class**
- **useFragment**
  - type: **boolean**
  - default: **false**
  - description: **The component will use the 'React.Fragment' component.
    _Please note that in case you set 'useFragment' to true the 'tag' and/or 'className' props will not have any effect on the component.
    Therefore, if you have styled the HTML element used in the 'tag' prop, you will get weird styling results._**

#### Components

The following components props are available

#### `<If>` Component

```jsx
<If show={true} tag="section" className="custom-class">
  <div>IF</div>
</If>
```

Available props (see global props as well):

- **show**

  - type: **boolean**
  - default: **true**
  - description: **The value which will show/hide the elements you enclose**

#### `<Else>` Component

```jsx
<Else show={true} tag="section" className="custom-class">
  <div>ELSE</div>
</Else>
```

Available props (see global props as well):

- **show**

  - type: **boolean**
  - default: **true**
  - description: **The value which will show/hide the elements you enclose**

> \*\*It is important to understand that you could do the same thing with 2 If components but by using If and Else you

    are covering semantics as well. It is also easier to read**

#### `<Conditional>` Component

```jsx
<Conditional
  condition={TRUTHLY_OR_FALSY_VALUE}
  tag="div"
  className="custom-class"
>
  <If tag="section" className="custom-class">
    <div>HI CONDITIONAL IF</div>
  </If>
  <Else tag="section" className="custom-class">
    <div>HI CONDITIONAL ELSE</div>
  </Else>
</Conditional>
```

Available props (see global props as well):

- **condition**
  - type: **boolean**
  - default: **true**
  - description: **depending on the 'condition' prop, it will toggle between if and else therefore the prop 'show' in if/else is
    redundant**

#### `<Cases>/<Case>` Component

```jsx
<Cases expression={"Jack"} tag="div" className="custom-class">
  <Case expressionValue={"Jack"}>Hi Jack</Case>
  <Case expressionValue={"John"}>Hi John</Case>
  <Case expressionValue={"Jim"}>Hi Jim</Case>
  <Case expressionValue={"Jason"}>Hi Jason</Case>
  <Case expressionValue={"default"}>Default</Case>
</Cases>
```

Available props for `<Cases>` (see global props as well):

- **expression**

  - type: **any**
  - description: **The expression to evaluate**

Available props for `<Case>` (see global props as well):

- **expressionValue**
  - type: **any**
  - description: **The expressionValue to evaluate with the expression in the `<Cases>` component**

#### `<Repeat>` Component **(_EXPERIMENTAL use .map() instead_)**

```jsx
/* No setKey default index will be used */
<Repeat
        iterator={[1, 2, 3]}
>
  <div>
    {'@iterator'}
    <div>{'@iterator'}</div>
  </div>
  <div>HI REPEAT #2</div>
  HI REPEAT #3 {'@iterator'}
</Repeat>

/* Array of objects */
<Repeat
        iterator={[{id: 'One', name: 'John'}, {id: 'Two', name: 'Jack'}, {id: 'Three', name: 'Jim'}]}
        setKey={"@iterator.name"}
>
  <div>
    {'@iterator.name'}
    <div>{'@iterator.id'}</div>
  </div>
  <div>HI REPEAT #2</div>
  HI REPEAT #3 {'@iterator.name'}
</Repeat>

/* Array of primitives */
<Repeat
        iterator={["Jack", "John", "Jill"]}
        setKey={"@iterator"}
>
  <div>
    {'@iterator'}
    <div>{'@iterator'}</div>
  </div>
  <div>HI REPEAT #2</div>
  HI REPEAT #3 {'@iterator'}
</Repeat>
```

Available props (see global props as well):

- **iterator**
  - type: **Array** || **Number**
  - default: **none this prop _is required_**
  - description: **Either pass an Array or a number for the component to work**
- **stringInterpolationIdentifier**
  - type: **string**
  - default: **"@iterator"**
  - description: **Change the default identifier for when applying the value of each element with {'@iterator'} inside JSX from the Array**
- **setKey**
  - type: **string**
  - default: **"index"**. If you want to access values in the array, then if it is an array of primitives values use "@iterator".
    If it is an array of objects then use "@iterator.PROP_NAME". See examples above.
  - description: **This prop will set the key for the element being iterated.**

## License

This project is licensed under the MIT License
