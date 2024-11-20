//Функции getList и setList - не требуют изменений

import React, { useState, useEffect, useRef } from "react";

function getList() {
  //Код функции не требует изменений
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(
        Array.from({ length: 10 }, (_el, index) => ({
          label: `label ${index + 1}`,
          checked: false,
          id: index,
        }))
      );
    }, 1000);
  });
}

function setList(list) {
  //Код функции не требует изменений
}

const Row = (props) => {
  const { label, checked, id, handleChange } = props;
  const renders = useRef(0);

  const incrementCounter = () => {
    renders.current += 1;
  };

  return (
    <div>
      {label}

      {` (${renders.current}) `}
      <input
        type="checkbox"
        checked={checked}
        onChange={() => handleChange(id, incrementCounter)}
      />
    </div>
  );
};

const List = ({ list }) => {
  if (list.length === 0) {
    return <div>LOADING...</div>;
  }

  const [localList, setLocalList] = useState([]);

  const handleChange = (id, incrementCounter) => {
    incrementCounter();
    const findLabel = localList.find((el) => el.id === id);
    const changeLabel = { ...findLabel, checked: !localList[id].checked };
    const updateLocalList = localList.map((el) =>
      el.id === changeLabel.id ? changeLabel : el
    );
    setLocalList(updateLocalList);
  };

  useEffect(() => {
    let isMounted = true;
    isMounted && setList(localList);
    return () => {
      isMounted = false;
    };
  }, [localList]);

  useEffect(() => {
    let isMounted = true;
    isMounted && setLocalList(list);
    return () => {
      isMounted = false;
    };
  }, [list]);

  return (
    <>
      {localList?.map((item) => (
        <React.Fragment key={item.id}>
          <Row {...item} handleChange={handleChange} />
        </React.Fragment>
      ))}
    </>
  );
};

const Test = () => {
  const [listRow, setListRow] = useState([]);

  useEffect(() => {
    getList().then((res) => {
      setListRow(res);
    });
  }, []);

  return (
    <div className="test">
      <h1>Test</h1>
      <List list={listRow} />
    </div>
  );
};

Test.defaultProps = {
  list: [],
  label: "",
  checked: false,
  id: null,
  list: [],
  handleChange: () => {},
};

export default Test;
