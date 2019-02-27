# React Templates Components

These components are not trying to re-invent the wheel or are anything new and spectacular. The main reason to use them 
is because you should strive to write your React components as humanly readable as possible.

React components tend to become un-readable with two main issues affecting readability:

* Multiple separate render functions which return JSX in the main render() function
* One large render() function with multiple .map() functions or conditional operators and use of JavaScript in general

In order to reduce boilerplate this library is introducing components that act like a DSL template language but in the 
form of React components.

## Getting Started



### Prerequisites if building from source

You should have an installation of NodeJS any version and npm or yarn

More over React and PropTypes are MANDATORY for the components to work.

Babel with presets "env", "stage-0" and "react" is also a dependency.

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

End with an example of getting some data out of the system or using it for a little demo

## Usage


#### Global props
**_The following props are available for all components:_**

* **tag**
  * type: **string**
  * default: **'div'**
  * description: **You can use here any tag or React element to enclose the children in the same time supporting semantic web**
* **className**
  * type: **string**
  * default: **" "**
  * description: **The usual value found in all React components that translate to class**

#### Components
The following components props are available

#### ```<If>``` Component 

```jsx
<If
    show={true}
    tag="section"
    className="custom-class"
>
    <div>IF</div>
</If>
```

Available props (see global props as well):
* **show**
  * type: **boolean**
  * default: **true**
  * description: **The value which will show/hide the elements you enclose**

  
#### ```<Else>``` Component 

```jsx
<Else
    show={true}
    tag="section"
    className="custom-class"
>
    <div>ELSE</div>
</Else>
```

Available props (see global props as well):
* **show**
  * type: **boolean**
  * default: **true**
  * description: **The value which will show/hide the elements you enclose**
  
> **It is important to understand that you could do the same thing with 2 If components but by using If and Else you
    are covering semantics as well. It is also easier to read**

#### ```<Conditional>``` Component 

```jsx
<Conditional
    condition
    tag="div"
    className="custom-class"
>
    <If
        tag="section"
        className="custom-class"
    >
        <div>HI CONDITIONAL IF</div>
    </If>
    <Else
        tag="section"
        className="custom-class"
    >
        <div>HI CONDITIONAL ELSE</div>
    </Else>
</Conditional>
```

Available props (see global props as well):
* **condition**
  * type: **boolean**
  * default: **true**
  * description: **depending on the 'condition' prop, it will toggle between if and else therefore the prop 'show' in if/else is
   redundant**

#### ```<Cases>/<Case>``` Component 

```jsx
<Cases
    expression={'Jack'}
    tag="div"
    className="custom-class"
>
    <Case expressionValue={'Jack'}>
        Hi Jack
    </Case>
    <Case expressionValue={'John'}>
        Hi John
    </Case>
    <Case expressionValue={'Jim'}>
        Hi Jim 
    </Case>
    <Case expressionValue={'Jason'}>
        Hi Jason
    </Case>
    <Case expressionValue={'default'}>
        Default
    </Case>
</Cases>
```

Available props for ```<Cases>``` (see global props as well):
* **condition**
  * expression: **any**
  * description: **The expression to evaluate**
  
Available props for ```<Case>``` (see global props as well):
* **condition**
  * expressionValue: **any**
  * description: **The expressionValue to evaluate with the expression in the ```<Cases>``` component**


#### ```<Repeat>``` Component 

```jsx
<Repeat iterator={[{id: 'One', name: 'John'}, {id: 'Two', name: 'Jack'}, {id: 'Three', name: 'Jim'}]}>
    <div iteratorkey="@key">
        {'@iterator.name'}
        <div>{'@iterator.id'}{'@key'}</div>
    </div>
    <div>HI REPEAT #2</div>
    HI REPEAT #3 {'@iterator.name'}
</Repeat>
```

Available props (see global props as well):
* **iterator**
  * type: **Array** || **Number**
  * default: **none this prop _is required_**
  * description: **Either pass an Array or a number for the component to work**
* **stringInterpolationIdentifier**
  * type: **string**
  * default: **"@iterator"**
  * description: **Change the default identifier for when applying the value of each element with {'@iterator'} inside JSX from the Array**
* **iteratorKeyIdentifier**
  * type: **string**
  * default: **"@key"**
  * description: **Change the default identifier for when you want to render the key prop found in every React element**
* **iteratorKeyGenerator**
  * type: **any**
  * default: **none**
  * description: **In case you want to create a unique identifier then use this prop otherwise the default behavior is Date().getMilliseconds()**  
  
> **If you want to pass the value of each element of an Array you _have_ to use the keyword '@iterator' as seen in the example above.
 This example uses an Array of objects therefore you pass the dot annotation to apply the value you want. in case there was 
 a single value array then '@iterator' would suffice. You can of course change this identifier as seen in the props description.**

## License

This project is licensed under the MIT License

