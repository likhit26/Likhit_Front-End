# React Component Code Review

## Introduction

1. Explain what the simple `List` component does.

    ```

    In React.js, the simple List component is a reusable component that allows developers to display a collection of items as a list. It is often used to create user interfaces that display data in a structured and organized manner.
    To create a simple List component in React, developers can use the built-in ul and li HTML elements. The ul element serves as the container for the list, while each item in the list is represented by an li element.
    Developers can pass an array of data as a prop to the simple List component. The component then maps through the array and renders each item as an li element, typically displaying the relevant information, such as the item's title or description.
    The simple List component in React can be customized to meet specific design needs. Developers can add CSS classes, apply styles, or use other React components inside the li elements to create more complex user interfaces.
    Overall, the simple List component in React allows developers to easily create and manage lists of items in a flexible and reusable way, making it a valuable tool for building user interfaces in web applications.

    ```

2. What problems / warnings are there with code?

    ```

     There are a few issues and potential warnings with this code:

     1-:In the SingleListItem component, the onClickHandler prop is being passed as a function that invokes handleClick with the index parameter. However, it should be passed as a function reference, like so: onClick={() => onClickHandler(index)}.

     2-:In the SingleListItem component, the isSelected prop is being passed as a boolean, but it should be passed as the index value to compare against selectedIndex. The correct value should be isSelected === index.

     3-:In the WrappedListComponent component, the items prop is declared with incorrect syntax. It should be defined as PropTypes.arrayOf(PropTypes.shape({text: PropTypes.string.isRequired})).

     4-:In the WrappedListComponent component, the selectedIndex state variable is being declared incorrectly. It should be declared with an initial value of null, like so: const [selectedIndex, setSelectedIndex] = useState(null).

     5-:In the WrappedListComponent component, the useEffect hook is resetting the selected index state variable whenever the items prop changes. This may not be desirable behavior in all cases. If the intent is to clear the selection whenever the list items change, this is fine. Otherwise, it may be better to remove this effect entirely.

     6-:The memo function is being used to memoize the SingleListItem and WrappedListComponent components, but it is not necessary in this case since they are both stateless functional components. Memoization is only useful for preventing unnecessary re-renders when a component's props have not changed.

    ```

3. Please fix, optimize, and/or modify the component as much as you think is necessary.


 ## code

  ```

//modified code

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={() => onClickHandler(index)}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
  items,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex === index}
        />
      ))}
    </ul>
  )
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.string.isRequired })),
};

WrappedListComponent.defaultProps = {
  items: [],
};

const List = memo(WrappedListComponent);

export default List;

   ```


Explanation of changes:

1-:In WrappedSingleListItem, the onClick handler should be a function that calls onClickHandler with the index, not the result of calling onClickHandler with the index. Change it to onClick={() => onClickHandler(index)}.

2-:In WrappedListComponent, the useState hook should be called with an initial value. Since the selectedIndex is initially null, it's better to set it explicitly in the hook declaration: const [selectedIndex, setSelectedIndex] = useState(null);.

3-:The default prop value for items should be an empty array instead of null. This is because an empty array is a valid value for an array prop, while null is not. Change it to items: [].

4-:The PropTypes definition for items should be PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.string.isRequired })) instead of PropTypes.array(PropTypes.shapeOf({ text: PropTypes.string.isRequired })). This is because array is a function, and you need to call it with the argument PropTypes.shape({ text: PropTypes.string.isRequired }) to create an array of objects with that shape.

  ```
